import { db, auth, storage, createTimestamp } from '../../config';

export class TeamPlayer {
  constructor(
    public name: string,
    public position: string = null
  ) { }
}

export class Team {

  constructor(
    public profileId: any,
    public title: string,
    public players: TeamPlayer[],
    public gameDuration: number,
    public playersOnField: number,
    public playersPerSub: number,
    public subFrequency: number,
    public sport: string = null,
    public id: string = null,
  ) { }

  /** Returns all Teams from the db for the active Profile */
  static allTeams(profileId: string): Promise<Team[] | { message: string, error: string }> {
    return db.collection('teams').where('profileId', '==', profileId).withConverter(this.teamConverter).get()
      .then(({docs}) => docs.map((doc) => doc.data()))
      .catch((error: any) => ({ message: 'Error getting all Teams for Profile:', error }));
  }

  static teamConverter = {
    toFirestore: function(team: Team) {
      let convPlayers = team.players.map(player => ({ name: player.name, position: null })) as Array<any>;
      return {
        profileId: team.profileId,
        title: team.title, 
        players: convPlayers,
        gameDuration: team.gameDuration,
        playersOnField: team.playersOnField,
        playersPerSub: team.playersPerSub,
        subFrequency: team.subFrequency,
        sport: team.sport
      }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Team(
          data.profileId,
          data.title, 
          data.players.map(({name, position}) => new TeamPlayer(name, position)),
          data.gameDuration,
          data.playersOnField,
          data.playersPerSub,
          data.subFrequency,
          data.sport || null,
          snapshot.id,
        );
    }
  }

}
