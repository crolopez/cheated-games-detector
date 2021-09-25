import { CheatedMatchInfo } from "../types/MatchInfo"
import { Cheater } from "../types/Cheater"

function getCheatProperty(property: string, print: boolean, value: string): string {
  return print ? `${property} ${value}\n` : ''
}

function printCheaters(cheaters: Cheater[]): string {
  if (cheaters.length == 0) {
    return 'No suspicious or assisted players found'
  }

  let message = 'Users:\n'
  cheaters.forEach(cheater => {
    const reason = cheater.reason
    message += `[${cheater.id}]\n\
    Level: ${cheater.level}\n\
    ${getCheatProperty('Suspicious tag:', reason.suspiciousTag, 'true')}\
    ${getCheatProperty('Influencer tag:', reason.influencerTag, 'true')}\
    ${getCheatProperty('Partner tag:', reason.partnerTag, 'true')}\
    ${getCheatProperty('Wins rate:', reason.winRatio.suspicious, reason.winRatio.ratio.toString())}\
    ${getCheatProperty('(L7D) Kills/game:', reason.weeklyKillsPerGame.suspicious, reason.weeklyKillsPerGame.ratio.toString())}\
    ${getCheatProperty('(L7D) Headshot %:', reason.weeklyHeadshotPct.suspicious, reason.weeklyHeadshotPct.ratio.toString())}`
  })

  return message
}

export function printCheatedMatchInfo(cheatedMatch: CheatedMatchInfo): string {
  return`\n\
    ****************\n\
    Match ID: ${cheatedMatch.id}\n\
    Timestamp: ${cheatedMatch.timestamp}\n\
    Average KD: ${cheatedMatch.averageKd}\n\
    Mode: ${cheatedMatch.mode}\n\
    Analyzed players: ${cheatedMatch.analyzedPlayers}\n\
    ${printCheaters(cheatedMatch.cheaters)}\n\
    ****************`
}
