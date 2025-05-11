// src/utils/holtWinters.ts

/**
 * Triple exponential smoothing (Holt–Winters) with additive seasonality.
 * @param data          historical values (length N)
 * @param seasonLength  length of your season (e.g. 7 for weekly)
 * @param alpha         smoothing factor for level (0–1)
 * @param beta          smoothing factor for trend (0–1)
 * @param gamma         smoothing factor for seasonality (0–1)
 * @param forecastLen   number of future points to forecast
 * @returns
 *   fitted   – in‐sample smoothed values (length N)
 *   forecast – out‐of‐sample forecasts (length forecastLen)
 */
export function holtWinters(
    data: number[],
    seasonLength: number,
    alpha: number,
    beta: number,
    gamma: number,
    forecastLen: number
  ): { fitted: number[]; forecast: number[] } {
    const N = data.length
    if (N < seasonLength) {
      // not enough data to initialize a full season
      return { fitted: data.slice(), forecast: [] }
    }
  
    // 1) initial level & trend
    let level = data[0]
    let trend = (data[seasonLength] - data[0]) / seasonLength
  
    // 2) initial seasonal indices
    const season: number[] = Array(seasonLength).fill(1)
    // average first seasons to initialize
    const seasonAverages = Array(Math.floor(N / seasonLength))
      .fill(0)
      .map((_, i) =>
        data
          .slice(i * seasonLength, (i + 1) * seasonLength)
          .reduce((sum, v) => sum + v, 0) / seasonLength
      )
  
    for (let i = 0; i < seasonLength; i++) {
      let sumOverAvg = 0
      for (let j = 0; j < seasonAverages.length; j++) {
        sumOverAvg += data[j * seasonLength + i] - seasonAverages[j]
      }
      season[i] = sumOverAvg / seasonAverages.length
    }
  
    const fitted: number[] = []
  
    // 3) run Holt–Winters for t = 0…N-1
    for (let t = 0; t < N; t++) {
      const value = data[t]
      const lastLevel = level
      const lastSeason = season[(t % seasonLength + seasonLength) % seasonLength]
  
      // update level, trend, season
      level = alpha * (value - lastSeason) + (1 - alpha) * (level + trend)
      trend = beta * (level - lastLevel) + (1 - beta) * trend
      season[t % seasonLength] =
        gamma * (value - level) + (1 - gamma) * lastSeason
  
      // fitted value is level+trend+season at t
      fitted.push(level + trend + season[t % seasonLength])
    }
  
    // 4) forecast
    const forecast: number[] = []
    for (let m = 1; m <= forecastLen; m++) {
      const idx = (N + m - 1) % seasonLength
      forecast.push(level + m * trend + season[idx])
    }
  
    return { fitted, forecast }
  }
  