import { getLastMatches } from './modules/matches'
import { searchForCheaters } from './modules/cheaterFinder'
import { printCheatedMatchInfo } from './utils/reportFormatter'
import { getConfig } from './utils/config'

const numberOfMatches = getConfig().GAMES_TO_ANALYZE
const user = getConfig().USER_TO_ANALYZE

async function init() {
  try {
    const matches = await getLastMatches(user, numberOfMatches)
    const cheatedMatchesData = Array.from(matches, match => searchForCheaters(match))
    await Promise.allSettled(cheatedMatchesData)
      .then(results => results.forEach(result => {
        if (result.status === 'fulfilled') {
          const cheatedMatch = result.value
          console.log(printCheatedMatchInfo(cheatedMatch))
        } else {
          console.log('It was not possible to obtain the information of a match.')
        }
      }))
  } catch(error) {
    if (error.response == undefined) {
      console.log(`Error: ${error}`)
    } else if (error.response.status != 429) {
      console.log(`Error: ${error.response.statusText} (${error.response.status})`)
    } else {
      console.log('Too many requests.')
    }
  }
}

init()