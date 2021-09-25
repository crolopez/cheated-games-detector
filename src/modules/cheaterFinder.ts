import axios from 'axios'
import { MatchInfo, CheatedMatchInfo } from '../types/MatchInfo'
import { RequestHeaders } from '../types/RequestHeaders'
import { APIdetails } from '../types/APIResponse'
import { UserDataInMatch } from '../types/UserDataInMatch'
import { API_CODES } from '../utils/apiCodes'
import { Cheater } from '../types/Cheater'
import { getCheater } from './cheaterAnalyzer'

//const WIN_RATIO_THRESHOLD = getConfig().WIN_RATIO_THRESHOLD

const statsAPI = 'https://api.tracker.gg/api/v2/warzone/standard/profile/'

// const userStatsDic = {}

function isExpectedError(response: any): boolean {
  const code = response.data.errors[0].code
  return code == API_CODES.USER_NOT_FOUND ||
    code == API_CODES.USER_NODATA ||
    code == API_CODES.USER_PRIVATE ||
    response.status == 403
}

async function getUserStats(user: string): Promise<APIdetails> {
  const userUrl = `${statsAPI}${user}`
  console.log(`Fetching from ${userUrl}`)
  try {
    const { data } = await axios.get(userUrl, RequestHeaders)
    return data.data
  } catch (error) {
    const response = error.response
    if (isExpectedError(response)) {
      return Promise.reject(`${user} not found. Possibly a private profile.`)
    }
    throw error
  }
}

function filterUsersWithoutStats(users: UserDataInMatch[]): UserDataInMatch[] {
  return users.filter(function(user) {
    if (user.userPlatform == '') {
      return false
    }
    return true
  })
}

export async function searchForCheaters(matchInfo: MatchInfo): Promise<CheatedMatchInfo> {
  const users = filterUsersWithoutStats(matchInfo.users)
  const usersData = Array.from(users, user => getUserStats(user.userPlatform))
  let cheaters: Cheater[] = []

  await Promise.allSettled(usersData)
  .then(results => results.forEach(result => {
    if (result.status === 'fulfilled') {
      const cheater = getCheater(result.value)
      if (cheater != null) cheaters.push(cheater)
    } else {
      console.log(result.reason)
    }
  }))

  return {
    id: matchInfo.id,
    mode: matchInfo.mode,
    averageKd: matchInfo.averageKd,
    timestamp: matchInfo.timestamp,
    analyzedPlayers: users.length,
    cheaters: cheaters
  }
}