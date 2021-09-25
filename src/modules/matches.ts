import axios from 'axios'
import { APImatch } from '../types/APIResponse'
import { RequestHeaders } from '../types/RequestHeaders'
import { MatchInfo } from '../types/MatchInfo'
import { getUsersFromMatch } from './users'

const matchesAPI = 'https://api.tracker.gg/api/v2/warzone/standard/matches/battlenet/<user>?type=wz'

async function getMatchesData(user: string): Promise<APImatch[]> {
  const userUrl = `${matchesAPI}`.replace('<user>', user).replace('#', '%23')
  const { data } = await axios.get(userUrl, RequestHeaders)
  return data.data.matches
}

function sortMatchesByDate(a: APImatch, b: APImatch) {
  if (a.metadata.timestamp > b.metadata.timestamp) {
    return 1;
  }
  if (a.metadata.timestamp < b.metadata.timestamp) {
    return -1;
  }
  return 0;
}

export async function getLastMatches(user: string, numberOfMatches: number): Promise<Array<MatchInfo>> {
  console.log(`Getting matches from ${user}.`)
  const matchesData = await getMatchesData(user)
  const sortedMatches = matchesData.sort(sortMatchesByDate).splice(numberOfMatches * -1)

  const matches: Array<MatchInfo> = []
  for(const match of sortedMatches) {
    console.log(`Getting users from ${match.attributes.id} (${match.metadata.timestamp}).`)
    const matchInfo = {
      id: match.attributes.id,
      mode: match.metadata.modeName,
      averageKd: match.attributes?.avgKd.kd,
      timestamp: match.metadata.timestamp,
      users: await getUsersFromMatch(match.attributes.id)
    }
    matches.push(matchInfo)
    if (numberOfMatches === matches.length) {
      break
    }
  }
  return matches
}
