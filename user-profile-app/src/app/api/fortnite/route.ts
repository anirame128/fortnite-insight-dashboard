// src/app/api/fortnite/route.ts
import { NextResponse } from 'next/server'
import { chromium }    from 'playwright-chromium'

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code')
  console.log('[fortnite] Incoming request, code=', code)
  if (!code) {
    console.error('[fortnite] No code provided')
    return NextResponse.json({ error: 'Map code is required' }, { status: 400 })
  }

  let browser = null
  try {
    console.log('[fortnite] Launching browser...')
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/120.0.0.0 Safari/537.36'
    })
    const page = await context.newPage()

    page.setDefaultNavigationTimeout(120_000)
    console.log('[fortnite] Navigating to island page…')
    await page.goto(
      `https://fortnite.gg/island?code=${encodeURIComponent(code)}`,
      { waitUntil: 'domcontentloaded' }
    )
    console.log('[fortnite] DOMContentLoaded reached')

    // grab the “players right now” from the green/red widget
    await page.waitForSelector(
      'div.chart-stats-div .chart-stats-title[data-n]',
      { state: 'attached', timeout: 10_000 }
    )
    const dataN = await page.$eval(
      'div.chart-stats-div .chart-stats-title[data-n]',
      el => el.getAttribute('data-n')
    )
    console.log('[fortnite] Raw data-n string:', dataN)
    if (!dataN) throw new Error('data-n attribute missing')
    const currentPlayers = Number(dataN)
    if (Number.isNaN(currentPlayers)) {
      throw new Error(`data-n is not a number: "${dataN}"`)
    }

    // now pull the last 30 days of *peak* counts from the monthly table
    console.log('[fortnite] Waiting for 30-day table…')
    await page.waitForSelector(
      '#js-chart-month-table table#chart-month-table tbody tr',
      { state: 'attached', timeout: 10_000 }
    )

    const dailyHistory: number[] = await page.$$eval(
      '#chart-month-table tbody tr:not(.no-sort)',
      rows =>
        rows.map(row => {
          // the 2nd <td> is the “Peak” column; its data-sort holds the raw number
          const peakTd = row.querySelector('td:nth-child(2)')
          const sort = peakTd?.getAttribute('data-sort') ?? ''
          return Number.parseInt(sort, 10) || 0
        })
    )
    console.log('[fortnite] Daily history (30 days):', dailyHistory)

    return NextResponse.json({
      currentPlayers,
      dailyHistory
    })
  } catch (err: any) {
    console.error('[fortnite] Error scraping Fortnite.gg:', err)
    return NextResponse.json(
      { error: 'Failed to fetch map statistics' },
      { status: 500 }
    )
  } finally {
    if (browser) {
      console.log('[fortnite] Closing browser')
      await browser.close()
    }
  }
}
