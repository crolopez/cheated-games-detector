import { config } from 'dotenv' // Remove it in serverless

config()

export function getConfig(): any {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is undefined')
  }
  if (!process.env.WIN_RATIO_THRESHOLD) {
    throw new Error('WIN_RATIO_THRESHOLD is undefined')
  }
  if (!process.env.GAMES_TO_ANALYZE) {
    throw new Error('GAMES_TO_ANALYZE is undefined')
  }
  if (!process.env.WEEKLY_KILLS_THRESHOLD) {
    throw new Error('WEEKLY_KILLS_THRESHOLD is undefined')
  }
  if (!process.env.WEEKLY_HEADSHOT_THRESHOLD) {
    throw new Error('WEEKLY_HEADSHOT_THRESHOLD is undefined')
  }
  if (!process.env.USER_TO_ANALYZE) {
    throw new Error('USER_TO_ANALYZE is undefined')
  }
  return {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN as string,
    GAMES_TO_ANALYZE: process.env.GAMES_TO_ANALYZE as unknown as number,
    WIN_RATIO_THRESHOLD: process.env.WIN_RATIO_THRESHOLD as unknown as number,
    WEEKLY_KILLS_THRESHOLD: process.env.WEEKLY_KILLS_THRESHOLD as unknown as number,
    WEEKLY_HEADSHOT_THRESHOLD: process.env.WEEKLY_HEADSHOT_THRESHOLD as unknown as number,
    USER_TO_ANALYZE: process.env.USER_TO_ANALYZE as string,
  }
}
