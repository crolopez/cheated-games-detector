import { Cheater } from "../types/Cheater";
import { APIdetails, APIdetailsSegment } from "../types/APIResponse";
import { getConfig } from "../utils/config";

function getOverviewData(user: APIdetails): APIdetailsSegment {
  return user.segments.filter(x => x.type == 'overview')[0]
}

function getBrData(user: APIdetails): APIdetailsSegment {
  return user.segments.filter(x => x.attributes.mode == 'br')[0]
}

export function getCheater(user: APIdetails): Cheater | null {
  const overview = getOverviewData(user).stats
  const br = getBrData(user).stats

  const cheater = {
    id: user.platformInfo.platformUserIdentifier,
    level: overview.level.value,
    kd: overview.kdRatio.value,
    reason: {
      winRatio: {
        suspicious: br.wlRatio.value > getConfig().WIN_RATIO_THRESHOLD,
        ratio: br.wlRatio.value
      },
      weeklyKillsPerGame: {
        suspicious: br.weeklyKillsPerGame.value > getConfig().WEEKLY_KILLS_THRESHOLD,
        ratio: br.weeklyKillsPerGame.value
      },
      weeklyHeadshotPct: {
        suspicious: br.weeklyHeadshotPct.value > getConfig().WEEKLY_HEADSHOT_THRESHOLD,
        ratio: br.weeklyHeadshotPct.value
      },
      suspiciousTag: user.userInfo.isSuspicious,
      partnerTag: user.userInfo.isPartner,
      influencerTag: user.userInfo.isInfluencer,
    }
  }

  return cheater.reason.winRatio.suspicious == true ||
    cheater.reason.weeklyKillsPerGame.suspicious == true ||
    cheater.reason.weeklyHeadshotPct.suspicious == true ||
    cheater.reason.suspiciousTag == true ||
    cheater.reason.partnerTag == true ||
    cheater.reason.influencerTag == true
    ? cheater : null
}
