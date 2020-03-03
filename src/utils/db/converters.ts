import Profile from './Profile';
import Team from './Team';
import Game from './Game';

let profileConverter = {
  toFirestore: function(profile: Profile) {
    return {
      created: this.created, 
      username: this.username, 
      firstName: this.firstName, 
      lastName: this.lastName, 
      userId: this.userId 
    }
  },
  fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      return new Profile(
        data.userId,
        data.firstName,
        data.lastName,
        data.username,
        data.created,
      );
  }
}

let teamConverter = {
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

export { 
  profileConverter,
  teamConverter
}
