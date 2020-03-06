import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

import Profile from '@utils/db/Profile';

import * as vars from '@base/variables'
import BasicButton from '@components/BasicButton';
import { TeamHeader } from '@components/TeamHeader';
import { NewTeam } from './NewTeam';
import { BasicHeader } from '@components/BasicHeader';
import { navigate } from '@base/src/RootNavigation';
import { Team } from '@utils/db/Team';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import DarkGradient from '@components/DarkGradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export class SelectTeam extends React.Component {

  state: any = {
    teamsLoaded: false,
    currentTeam: null,
    allTeams: null
  }
  props: any;

  newTeam(): void {

  }

  componentDidMount(): void {
    let { team } = this.props.route.params;
    this.setState({ currentTeam: team });

    Profile.dbProfile().then((profile: Profile) => profile.id)
      .then((profileId: string) => Team.allTeams(profileId))
      .then((teams: Team[]) => {
        console.log(teams.length)
        console.log('All Teams');
        if (teams && teams instanceof Array) this.setState({ allTeams: teams });
        this.setState({ teamsLoaded: true })
      }).catch(err => console.log('Error getting profile:', err));
    console.log(this.props.route.params);
    console.log('View Team Full Screen');
  }

  render(): any {

    let { team } = this.props.route.params;
    return (
      <SafeAreaView style={[vars.screenView, styles.selectTeamView]}>
        <View style={styles.teamContainer}>
          <Text style={styles.teamText}>Your Teams</Text>
        </View>

        <ScrollView style={[{ maxHeight: this.state.allTeams ? this.state.allTeams.length * 100 : 0 }]}>
          { this.state.allTeams ? this.state.allTeams.map((team: Team, index: number) => (
            // <TouchableOpacity style={[styles.teamContainer, {backgroundColor: vars.colors[index]}]} onPress={() => navigate('ViewTeam', { team })}>
            //   <Text style={styles.teamText}>{team.title}</Text>
            // </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('ViewTeam', { team })} style={[styles.dashboardCard, true && { backgroundColor: vars.colors[index] }]} key={index}>
              <MaterialCommunityIcons color="white" size={30} name="soccer" style={styles.cardIcon}/>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{team.title}</Text>
                <Text style={styles.cardSubtitle}>{team.players.length} Players</Text>
              </View>
            </TouchableOpacity>
          )) : null }
        </ScrollView>
        {/* <TouchableOpacity style={[styles.teamContainer, {backgroundColor: this.state.allTeams? vars.colors[this.state.allTeams.length] : null}]} onPress={() => navigate('NewTeam')}>
          <Text style={styles.teamText}>New Team</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigate('NewTeam', null)} style={[styles.dashboardCard, {backgroundColor: this.state.allTeams? vars.colors[this.state.allTeams.length] : null}]}>
          <Ionicons name="ios-add-circle-outline" color="white" size={30} style={styles.cardIcon}/>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>New Team</Text>
          </View>
        </TouchableOpacity>
        <DarkGradient/>
      </SafeAreaView>

    )
  }

}

const styles = StyleSheet.create({
  selectTeamView: {
    backgroundColor: vars.bgColor,
    justifyContent: 'flex-start'
  },
  teamContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamText: {
    fontSize: 24,
    fontFamily: 'roboto-light',
    color: '#fff'
  },
  cardTitle: {
    fontFamily: 'roboto-light',
    fontSize: 22,
    color: '#fff',

  },
  cardSubtitle: {
    fontFamily: 'roboto-light',
    fontSize: 16,
    color: '#fff',
  },

  dashboardCard: {
    backgroundColor: '#4f677a80',
    
    height: 100,
    // marginBottom: 16,
    // ...vars.cardElevation,
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 2,
  },
  cardContent: {
    marginLeft: 20
  },
  cardIcon: {
    marginLeft: 20
  }
})