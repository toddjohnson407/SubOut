import { createTimestamp } from '@base/src/config';

class GamePlayer {

  constructor(
    public name: string,
    public isStarting: boolean = true,
    public opts: {
      points?: number,
      playingTime?: number
    }
  ) { }

}

export default class Game {

  date: any;

  constructor(
    public rosterId: string,
    public players: GamePlayer[],
    public opts: {
      gameDuration?: number,
      playersOnField?: number,
      playersPerSub?: number,
      subFrequency?: number,
      score?: { home: number, opponent: number }
      opponent?: string
    }
  ) {
    this.date = createTimestamp();
  }
  
  static gameFromDatabase(opts = {}): Game {
    // static newGame(opts = {}): Game {
    return null;
  }
}
