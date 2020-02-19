
class TeamPlayer {
  constructor(
    public name: string,
    public position: string = null
  ) {

  }
}

export default class Team {

  constructor(
    public id: string,
    public title: string,
    public players: TeamPlayer[],
    public gameDuration: number,
    public playersOnField: number,
    public playersPerSub: number,
    public subFrequency: number,
    public sport: string = null,
  ) {

  }

}
