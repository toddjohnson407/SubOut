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
