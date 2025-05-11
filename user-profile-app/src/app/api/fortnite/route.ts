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

  // 2) Extract internal numeric ID
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
    // 3) Fetch the 1-month JSON series
    const graphUrl = `https://fortnite.gg/player-count-graph?range=1m&id=${mapId}`
    const graphRes = await fetch(graphUrl, {
      headers: {
        'Accept':    'application/json',
        'Referer':   `https://fortnite.gg/island?code=${encodeURIComponent(code)}`
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

    // 4) Build daily aggregated data
    const { start, step, values } = data
    
    // Create a map to store daily peaks
    const dailyPeaks = new Map<string, { peak: number, timestamp: number }>()
    
    values.forEach((val: number, i: number) => {
      const ms = (start + step * i) * 1000
      const dt = new Date(ms)
      const dateKey = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      
      // Update peak if this value is higher or if it's the first entry for this day
      const current = dailyPeaks.get(dateKey)
      if (!current || val > current.peak) {
        dailyPeaks.set(dateKey, { peak: val, timestamp: ms })
      }
    })

    // Convert map to arrays, sorted by timestamp
    const sortedEntries = Array.from(dailyPeaks.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp)

    const labels: string[] = []
    const dailyHistory: number[] = []
    const timestamps: number[] = []

    sortedEntries.forEach(([dateKey, { peak, timestamp }]) => {
      labels.push(dateKey)
      dailyHistory.push(peak)
      timestamps.push(timestamp)
    })

    const currentPlayers = dailyHistory[dailyHistory.length - 1] || 0

    return NextResponse.json({
      currentPlayers,
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
