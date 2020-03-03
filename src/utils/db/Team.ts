import { db, auth, storage, createTimestamp } from '../../config';

class TeamPlayer {
  constructor(
    public name: string,
    public position: string = null
  ) {

  }
}

export default class Team {

  constructor(
    public profileId: any,
    public title: string,
    public players: TeamPlayer[],
    public gameDuration: number,
    public playersOnField: number,
    public playersPerSub: number,
    public subFrequency: number,
    public id: string = null,
    public sport: string = null,
  ) {

  }

  static teamConverter = {
    toFirestore: function(team: Team) {
      return {
        profileId: team.profileId,
        title: team.title, 
        players: team.players,
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
          data.players,
          data.gameDuration,
          data.playersOnField,
          data.playersPerSub,
          data.subFrequency,
          data.sport || null
        );
    }
  }

  // get dbFormat(): any {
  //   return {
  //     profileId: this.profileId,
  //     title: this.title, 
  //     players: this.players,
  //     gameDuration: this.gameDuration,
  //     playersOnField: this.playersOnField,
  //     playersPerSub: this.playersPerSub,
  //     subFrequency: this.subFrequency,
  //     sport: this.sport
  //   };
  // }

  // createTeam(): void {
  //   db.collection('teams').doc().set(this.dbFormat).then(res => {
  //     console.log('Team created');
  //     console.log('New team res:', res);
  //   }).catch(err => console.log('Error creating team:', err));
  // }

}
