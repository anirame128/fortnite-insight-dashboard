/**
 * Forecast result interface for time series data
 */
interface ForecastResult {
    forecastData: number[]
    forecastLabels: string[]
    forecastTimestamps: number[]
  }
  
  /**
   * Triple Exponential Smoothing (Holt–Winters) forecast:
   * models level, trend and multiplicative seasonality.
   */
  export function holtWintersForecast(
    historicalData: number[],
    timestamps: number[],
    daysToForecast: number    = 30,
    alpha: number             = 0.3,   // level smoothing
    beta: number              = 0.1,   // trend smoothing
    gamma: number             = 0.05,  // season smoothing
    seasonLength: number      = 7      // e.g. 7 days/week
  ): ForecastResult {
    const n = historicalData.length
  
    // --- FALLBACK if you don't even have one full season ---
    if (n < seasonLength) {
      // simple “repeat last season” naive
      const lastTs = timestamps[n - 1]
      const lastSeason = historicalData.slice(-seasonLength)
      const forecastData: number[] = [historicalData[n - 1]]
      const forecastLabels: string[] = []
      const forecastTimestamps: number[] = []
  
      for (let i = 1; i <= daysToForecast; i++) {
        forecastData.push(lastSeason[(i - 1) % seasonLength])
        const next = lastTs + i * 24 * 60 * 60 * 1_000
        forecastTimestamps.push(next)
        forecastLabels.push(
          new Date(next).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        )
      }
  
      return { forecastData, forecastLabels, forecastTimestamps }
    }
  
    // --- 1) allocate arrays ---
    const level    = new Array<number>(n).fill(0)
    const trend    = new Array<number>(n).fill(0)
    // only need one seasonLength's worth of seasonal factors:
    const seasonal = new Array<number>(seasonLength).fill(0)
  
    // --- 2) initialize level & trend ---
    level[0] = historicalData[0]
    // average trend over first season:
    let sumTrend = 0
    for (let i = 0; i < seasonLength; i++) {
      sumTrend += (historicalData[i + seasonLength] - historicalData[i]) / seasonLength
    }
    trend[0] = sumTrend / seasonLength
  
    // --- 3) initialize seasonal factors (multiplicative) ---
    // compute mean of first season
    const seasonAvg =
      historicalData
        .slice(0, seasonLength)
        .reduce((a, b) => a + b, 0) /
      seasonLength
  
    for (let i = 0; i < seasonLength; i++) {
      seasonal[i] = historicalData[i] / seasonAvg
    }
  
    // --- 4) smoothing pass through history ---
    for (let t = 1; t < n; t++) {
      const prevLevel  = level[t - 1]
      const prevTrend  = trend[t - 1]
      // wrap-around lookup
      const prevSeason = seasonal[(t - seasonLength + seasonLength) % seasonLength]
  
      // level
      level[t] = alpha * (historicalData[t] / prevSeason)
                 + (1 - alpha) * (prevLevel + prevTrend)
  
      // trend
      trend[t] = beta * (level[t] - prevLevel)
                 + (1 - beta) * prevTrend
  
      // seasonal (store into position t mod seasonLength)
      seasonal[t % seasonLength] =
        gamma * (historicalData[t] / level[t])
        + (1 - gamma) * prevSeason
    }
  
    // --- 5) generate forecast ---
    const forecastData: number[] = []
    // include the last actual as the “day 0” point
    forecastData.push(historicalData[n - 1])
  
    for (let h = 1; h <= daysToForecast; h++) {
      const seasonFactor = seasonal[(n + h - 1) % seasonLength]
      const raw =
        (level[n - 1] + h * trend[n - 1]) * seasonFactor
  
      // you can clamp at zero if you like, or leave negatives
      forecastData.push(raw)
    }
  
    // --- 6) build labels & timestamps ---
    const lastTs = timestamps[n - 1]
    const forecastLabels: string[] = []
    const forecastTimestamps: number[] = []
  
    for (let i = 1; i <= daysToForecast; i++) {
      const ts = lastTs + i * 24 * 60 * 60 * 1_000
      forecastTimestamps.push(ts)
      forecastLabels.push(
        new Date(ts).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      )
    }
  
    return { forecastData, forecastLabels, forecastTimestamps }
  }
  