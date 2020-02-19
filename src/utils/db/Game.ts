import { createTimestamp } from '../../config';

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

  date: Date;

  constructor(
    date: Date,
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
    this.date = createTimestamp(this.date);
  }
  
  static gameFromDatabase(opts = {}): Game {
    // static newGame(opts = {}): Game {
    return null;
  }
}
