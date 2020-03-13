import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

import Profile from '@utils/db/Profile';

import BasicButton from '@components/BasicButton';
import { BasicHeader } from '@components/BasicHeader';
import { navigate, reset } from '@base/src/RootNavigation';
import { Team } from '@utils/db/Team';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import * as vars from '@base/variables'
import DarkGradient from '@components/DarkGradient';
import { Game } from '@utils/db/Game';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export class LoadingTeams extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false

  state: any = {
    profile: null,
    currentTeam: null,
    allTeams: null,
    allGames: null,
    activeGame: null
  }

  componentDidMount(): any {
    this._isMounted = true;
    this.currentProfile().pipe(
      switchMap((profile: Profile) => {
        this.setState({ profile });

        return this.allTeams(profile.id).pipe(switchMap((teams: Team[]) => {

          if (teams && teams instanceof Array) {
            let currentTeam = teams[2];
            this.setState({ allTeams: teams, currentTeam }); 
            return this.allGames(teams.map(({id}) => id));
          } 
          return null;
        }));
      })
    ).subscribe((games: Game[]) => {
      // console.log(games);
      // Game.setActiveGameId(this.state.profile.id, games[0].id);
      this.setState({ allGames: games });
      if (this.state.profile['activeGameId']) {
        let { activeGameId } = this.state.profile;
        // console.log(activeGameId);
        // console.log(games.map(({id}) => id));
        let activeGame = games.find(({id}) => id === activeGameId);
        // console.log(activeGame);
        this.setState({ activeGame });
        reset('ActiveGame', { currentTeam: this.state.currentTeam, game: this.state.activeGame });
      } else {
        reset('ViewTeam', { currentTeam: this.state.currentTeam, allTeams: this.state.allTeams })
      }
    });
  }

  /** Returns all teams as an Observable */
  allTeams(profileId: string): Observable<Team[] | { message: string, error: string }> {
    return from(Team.allTeams(profileId))
  }

  /** Returns the current Profile as an Observable */
  currentProfile(): Observable<Profile> {
    return from(Profile.dbProfile());
  }

  /** Returns the active Game as an Observable */
  activeGame(gameId: string): Observable<Game> {
    return from(Game.activeGame(gameId));
  }

  /** Returns all Games related to a Profile*/
  allGames(teamIds: string[]): Observable<Game[] | { message: string, error: string }> {
    return from(Game.allGames(teamIds));
  }

  /** Returns all Games sorted by Team */
  gamesByTeam(games: Game[]): { teamId: string, games: Game[] }[] {
    let gamesByTeam: { teamId: string, games: Game[] }[] = games.reduce((sortedGames, game) => {
      if (!sortedGames.length) return [{ teamId: game.teamId, games: [game] }];
      let teamIndex = sortedGames.findIndex(({teamId}) => teamId === game.teamId);
      if (teamIndex === -1) return [...sortedGames, [{ teamId: game.teamId, games: [game] }]];
      sortedGames[teamIndex].games.push(game);
      return sortedGames
    }, [])
    return gamesByTeam;
  }

  componentWillUnmount(): any {
    this._isMounted = false;
  }

  render(): any {
    return (
      <View style={[vars.screenView]}>
        <DarkGradient/>
      </View>
    )
  }

}

const styles = StyleSheet.create({

})

