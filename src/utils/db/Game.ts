import { createTimestamp, db } from '@base/src/config';
import { Team } from './Team';
import { AsyncStorage } from 'react-native';


export class GamePlayer {

  constructor(
    public name: string,
    public opts: {
      points?: number,
      playingTime?: number
    } = { points: null, playingTime: null }
  ) { }

}

export class Game {

  date: any;

  constructor(
    public teamId: string,
    public players: GamePlayer[],
    public opts: {
      relatedTeam?: Team,
      gameDuration?: number,
      playersOnField?: number,
      playersPerSub?: number,
      subFrequency?: number,
      score?: { home: number, opponent: number },
      opponent?: string
    } = {},
    public id: string = null
  ) {
    this.date = createTimestamp();
  }
  

  static storeActiveGameId = async (id: string) => {
    try {
      await AsyncStorage.setItem('@activeGameId', id);
    } catch (err) { console.log('Error storing active Game ID', err) }
  }

  static getActiveGame = async () => {
    try {
      const id = await AsyncStorage.getItem('@activeGameId');
      if (id !== null) {
        let activeGame = await Game.activeGame(id);
        return activeGame;
      } else return null
    } catch (err) { console.log('Error getting active Game ID', err) }
  }

  /** Returns Game from the db by its id */
  static activeGame(id: string): Promise<Game> {
    return db.collection('games').doc(id).withConverter(this.gameConverter).get()
      .then((doc: any) => doc.data())
      .catch((error: any) => ({ message: 'Error getting all Teams for Profile:', error }));
  }

  /** Returns all Games from the db by an Array of Team ids */
  static allGames(teamIds: string[]): Promise<Game[] | { message: string, error: string }> {
    return db.collection('games').where('teamId', 'in', teamIds).withConverter(this.gameConverter).get()
      .then(({docs}) => docs.map((doc) => doc.data()))
      .catch((error: any) => ({ message: 'Error getting all Games for Team[]:', error }));
  }

  /** Sets the activeGameId attribute of the current Profile */
  static setActiveGameId(profileId: string, gameId: string): void {
    db.collection('profiles').doc(profileId).update({ activeGameId: gameId }).then((_: void) => console.log('Active Game Updated'))
  }

  static gameConverter = {
    toFirestore: function(game: Game) {
      game.players.forEach((player: any, index: number) => {
        let gamePlayerOpts = { points: null, playingTime: null };
        Object.entries(player.opts).forEach(([key, val], index) => gamePlayerOpts[key] = val);
        game.players[index].opts = gamePlayerOpts;
      });
      
      let gameOpts = { gameDuration: null, playersOnField: null, playersPerSub: null, subFrequency: null, score: { home: null, opponent: null }, opponent: null };
      let team = game.opts.relatedTeam;
      
      Object.entries(gameOpts).forEach(([key, val], index: number) => {
        if (game.opts[key]) gameOpts[key] = game.opts[key]
        else if (team[key]) gameOpts[key] = team[key];
      });

      let convPlayers = game.players.map(player => ({ name: player.name, ...player.opts })) as Array<any>;
      return {
        teamId: game.teamId,
        players: convPlayers,
        date: game.date,
        opts: gameOpts
      }
    },
    fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      return new Game(
        data.teamId,
        data.players.map(({name}) => new GamePlayer(name)),
        data.opts,
        snapshot.id
      );
    }
  }
}
