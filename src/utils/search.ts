import { NextResponse } from 'next/server'

interface SearchResult {
  code: string
  name: string
  currentPlayers: number
  peak24h: number
  dailyGain: number
  labels: string[]
  dailyHistory: number[]
  timestamps: number[]
}

async function searchFortniteMaps(code: string): Promise<SearchResult[] | null> {
  try {
    const response = await fetch(`https://fortnite.gg/island?code=${encodeURIComponent(code)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    if (!response.ok) {
      throw new Error(`Failed to load island page (${response.status})`)
    }

    const html = await response.text()

    const nowAttr = html.match(/data-n=["'](\d+)["']/)
    const currentPlayers = nowAttr ? parseInt(nowAttr[1], 10) : 0

    let mapId: string | null = null
    const favMatch = html.match(/class=["']favorite["'][^>]*data-id=["'](\d+)["']/)
    const weekMatch = html.match(/<div[^>]id=["']chart-week["'][^>]data-id=["'](\d+)["']/)
    mapId = favMatch?.[1] || weekMatch?.[1] || null

    if (!mapId) {
      throw new Error('Could not find internal map ID in page HTML')
    }

    const graphUrl = `https://fortnite.gg/player-count-graph?range=1m&id=${mapId}`
    const graphResponse = await fetch(graphUrl, {
      headers: {
        'Accept': 'application/json',
        'Referer': `https://fortnite.gg/island?code=${encodeURIComponent(code)}`
      }
    })

    if (!graphResponse.ok) {
      throw new Error(`Graph API returned HTTP ${graphResponse.status}`)
    }

    const graphJson = await graphResponse.json()
    const data = graphJson?.data

    if (!data?.values || !Array.isArray(data.values)) {
      throw new Error('Invalid graph data format')
    }

    const { start, step, values } = data
    const dailyPeaks = new Map<string, { peak: number, timestamp: number }>()
    values.forEach((val: number, i: number) => {
      const ms = (start + step  i)  1000
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

    const peak24h = dailyHistory.length > 0 ? dailyHistory[dailyHistory.length - 1] : 0
    const len = dailyHistory.length
    const prevPeak = len > 1 ? dailyHistory[len - 2] : 0
    const dailyGain = prevPeak
      ? Math.round(((dailyHistory[len - 1] - prevPeak) / prevPeak) * 1000) / 10
      : 0

    return [
      {
        code,
        name: `Fortnite Map ${code}`,
        currentPlayers,
        peak24h,
        dailyGain,
        labels,
        dailyHistory,
        timestamps
      }
    ]
  } catch (error) {
    console.error('Error searching fortnite maps:', error)
    return null
  }
}

export { searchFortniteMaps }