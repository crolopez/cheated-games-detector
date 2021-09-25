export interface APImatchSegment {
  metadata: {
    platformUserHandle: string,
    clanTag: string,
    placement: {
      value: number
    },
    profileUrl: string
  },
  stats: {
    kills: {
        value: number,
    },
    score: {
      value: number,
    },
    headshots: {
      value: number,
    },
    deaths: {
      value: number,
    },
    percentTimeMoving: {
      value: number,
    },
    distanceTraveled: {
      value: number,
    }
  }
}

export interface APImatch {
  attributes: {
    id: number,
    avgKd: {
      kd: number
    }
  },
  metadata: {
    modeName: string,
    timestamp: string
  },
  segments: APImatchSegment[]
}

export interface APIdetailsSegment {
  type: string,
  attributes: {
      mode: string
  },
  stats: {
    // Overview
    level: {
      value: number,
    },
    kdRatio: {
      value: number,
    },
    // Mode
    wlRatio: {
      value: number,
    },
    weeklyKillsPerGame: {
      value: number,
    },
    weeklyHeadshotPct: {
      value: number,
    },
    /*
    score: {
      value: number,
    },
    headshots: {
      value: number,
    },
    deaths: {
      value: number,
    },
    percentTimeMoving: {
      value: number,
    },
    distanceTraveled: {
      value: number,
    }
    */
  }
}

export interface APIdetails {
  platformInfo: {
    platformUserHandle: string,
    platformUserIdentifier: string
  },
  userInfo: {
    isInfluencer: boolean,
    isPartner: boolean,
    isSuspicious: boolean
  },
  segments: APIdetailsSegment[]
}
