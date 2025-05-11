import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code')
  if (!code) {
    return NextResponse.json({ error: 'Map code is required' }, { status: 400 })
  }

  // 1) Fetch the island page HTML
  const pageRes = await fetch(
    `https://fortnite.gg/island?code=${encodeURIComponent(code)}`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  )
  if (!pageRes.ok) {
    return NextResponse.json(
      { error: `Failed to load island page (${pageRes.status})` },
      { status: 502 }
    )
  }
  const html = await pageRes.text()

  // 2) Extract the "Players right now" count from the stats panel
  //    Matches: <div class="chart-stats-title" …>11,893</div><div>Players right now</div>
  const nowAttr = html.match(/data-n=["'](\d+)["']/)
  const currentPlayers = nowAttr
    ? parseInt(nowAttr[1], 10)
    : 0
  console.log('currentPlayers', currentPlayers)

  // 3) Extract internal numeric ID for the graph API
  let mapId: string | null = null
  const favMatch  = html.match(/class=["']favorite["'][^>]*data-id=["'](\d+)["']/)
  const weekMatch = html.match(/<div[^>]*id=["']chart-week["'][^>]*data-id=["'](\d+)["']/)
  mapId = favMatch?.[1] || weekMatch?.[1] || null

  if (!mapId) {
    return NextResponse.json(
      { error: 'Could not find internal map ID in page HTML' },
      { status: 500 }
    )
  }

  try {
    // 4) Fetch the 1-month JSON series
    const graphUrl = `https://fortnite.gg/player-count-graph?range=1m&id=${mapId}`
    const graphRes = await fetch(graphUrl, {
      headers: {
        'Accept':  'application/json',
        'Referer': `https://fortnite.gg/island?code=${encodeURIComponent(code)}`
      }
    })
    if (!graphRes.ok) {
      throw new Error(`Graph API returned HTTP ${graphRes.status}`)
    }

    const graphJson = await graphRes.json()
    const data      = graphJson?.data
    if (!data?.values || !Array.isArray(data.values)) {
      throw new Error('Invalid graph data format')
    }

    // 5) Build daily aggregated peaks as before
    const { start, step, values } = data
    const dailyPeaks = new Map<string, { peak: number, timestamp: number }>()
    values.forEach((val: number, i: number) => {
      const ms = (start + step * i) * 1000
      const dt = new Date(ms)
      const dateKey = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      const current = dailyPeaks.get(dateKey)
      if (!current || val > current.peak) {
        dailyPeaks.set(dateKey, { peak: val, timestamp: ms })
      }
    })

    const sorted = Array.from(dailyPeaks.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp)

    const labels: string[] = []
    const dailyHistory: number[] = []
    const timestamps: number[] = []
    sorted.forEach(([dateKey, { peak, timestamp }]) => {
      labels.push(dateKey)
      dailyHistory.push(peak)
      timestamps.push(timestamp)
    })

    // Calculate 24-hour peak from the most recent day's data
    const peak24h = dailyHistory.length > 0 ? dailyHistory[dailyHistory.length - 1] : 0

    const len = dailyHistory.length
    const prevPeak = len > 1 ? dailyHistory[len - 2] : 0
    const dailyGain = prevPeak
      ? Math.round(((dailyHistory[len - 1] - prevPeak) / prevPeak) * 1000) / 10
      : 0

    return NextResponse.json({
      currentPlayers,
      peak24h,
      dailyGain,
      labels,
      dailyHistory,
      timestamps
    })
  } catch (err: unknown) {
    console.error('[fortnite API] Error fetching graph:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch map statistics' },
      { status: 500 }
    )
  }
}
