export interface Cheater {
  id: string,
  level: number,
  kd: number,
  reason: {
    winRatio: {
      suspicious: boolean,
      ratio: number
    },
    weeklyKillsPerGame: {
      suspicious: boolean,
      ratio: number
    },
    weeklyHeadshotPct: {
      suspicious: boolean,
      ratio: number
    },
    suspiciousTag: boolean,
    partnerTag: boolean,
    influencerTag: boolean,
  }
}
