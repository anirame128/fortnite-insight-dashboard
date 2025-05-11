import { NextResponse } from 'next/server'
import { chromium }    from 'playwright-chromium'

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code')
  if (!code) {
    return NextResponse.json({ error: 'Map code is required' }, { status: 400 })
  }

  let browser = null
  try {
    browser = await chromium.launch({ headless: true })
    const ctx  = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/120.0.0.0 Safari/537.36'
    })
    const page = await ctx.newPage()
    page.setDefaultNavigationTimeout(120_000)

    // 1) go to the island page
    await page.goto(
      `https://fortnite.gg/island?code=${encodeURIComponent(code)}`,
      { waitUntil: 'domcontentloaded' }
    )

    // 2) grab "Players Right Now"
    await page.waitForSelector('div.chart-stats-title[data-n]')
    const dataN = await page.$eval(
      'div.chart-stats-title[data-n]',
      el => el.getAttribute('data-n')
    )
    const currentPlayers = Number(dataN)
    if (Number.isNaN(currentPlayers)) throw new Error(`Invalid data-n: ${dataN}`)

    // 3) click the 1M tab & wait for it to become active
    await page.waitForSelector('.chart-range[data-range="1m"]')
    await page.click('.chart-range[data-range="1m"]')
    await page.waitForSelector('.chart-range[data-range="1m"].chart-range-active', { timeout: 5000 })

    // 4) now wait until the very first cell in the month-table contains a comma (e.g. "Sunday, May 11")
    await page.waitForFunction(() => {
      const cell = document.querySelector(
        '#chart-month-table tbody tr:not(.no-sort) td'
      )
      return !!cell && /,/.test(cell.textContent || '')
    }, { timeout: 10000 })

    // 5) bump DataTables to 30 rows
    await page.evaluate(() => {
      const dt = (window as any).jQuery?.('#chart-month-table')?.DataTable?.()
      if (dt) dt.page.len(30).draw()
    })
    await page.waitForTimeout(300)

    // 6) scrape your labels & peaks
    const rows = await page.$$eval(
      '#chart-month-table tbody tr:not(.no-sort)',
      trs => trs.map(tr => {
        const [dayTd, peakTd] = Array.from(tr.querySelectorAll('td'))
        return {
          day:  dayTd.textContent?.trim() ?? '',
          peak: parseInt(peakTd.getAttribute('data-sort') || '0',  10) || 0
        }
      })
    )

    const labels       = rows.map(r => r.day)
    const dailyHistory = rows.map(r => r.peak)

    return NextResponse.json({ currentPlayers, labels, dailyHistory })
  } catch (err: any) {
    console.error('[fortnite] Error:', err)
    return NextResponse.json({ error: 'Failed to fetch map statistics' }, { status: 500 })
  } finally {
    if (browser) await browser.close()
  }
}