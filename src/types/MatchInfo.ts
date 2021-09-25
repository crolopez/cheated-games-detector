import { UserDataInMatch } from './UserDataInMatch';
import { Cheater } from './Cheater';

export interface MatchInfo {
  id: number,
  mode: string,
  averageKd: number,
  timestamp: string,
  users: UserDataInMatch[]
}

export interface CheatedMatchInfo {
  id: number,
  mode: string,
  averageKd: number,
  timestamp: string,
  analyzedPlayers: number,
  cheaters: Cheater[]
}
