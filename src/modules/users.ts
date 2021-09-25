import axios from 'axios'
import { APImatch } from '../types/APIResponse'
import { RequestHeaders } from '../types/RequestHeaders'
import { UserDataInMatch } from '../types/UserDataInMatch'

const matchesAPI = 'https://api.tracker.gg/api/v2/warzone/standard/matches/'

async function getUsersData(match: number): Promise<APImatch> {
  const userUrl = `${matchesAPI}${match}`
  const { data } = await axios.get(userUrl, RequestHeaders)
  return data.data
}

function getUserPlatform(profileUrl: string): string {
  if (profileUrl === undefined) {
    return profileUrl
  }
  const urlRegex = 'warzone\/profile\/(.*)\/overview'
  const urlParsed = profileUrl.match(urlRegex)
  if (urlParsed == null) {
    throw new Error(`Unexpected profileUrl format: ${profileUrl}`)
  }
  return urlParsed[1]
}

export async function getUsersFromMatch(match: number): Promise<Array<UserDataInMatch>> {
  const matchData = await getUsersData(match)

  return matchData.segments.map(function(item): UserDataInMatch {
    const userId = item.metadata.platformUserHandle
    const userClan = item.metadata.clanTag
    const userData: UserDataInMatch = {
      user: userClan ? `[${userClan}]${userId}` : userId,
      placement: item.metadata.placement.value,
      kills: item.stats.kills.value,
      userPlatform: '',
      score: item.stats.score.value,
      headshots: item.stats.headshots.value,
      deaths: item.stats.deaths.value,
      percentTimeMoving: item.stats.percentTimeMoving.value,
      distanceTraveled: item.stats.kills.value
    }
    if (item.metadata.profileUrl != undefined) {
      userData.userPlatform = getUserPlatform(item.metadata.profileUrl)
    }
    return userData
  })
}
