import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

import Profile from '@utils/db/Profile';

import * as vars from '@base/variables'
import BasicButton from '@components/BasicButton';
import { NewTeam } from './NewTeam';
import { BasicHeader } from '@components/BasicHeader';
import { navigate } from '@base/src/RootNavigation';
import { Team } from '@utils/db/Team';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import DarkGradient from '@components/DarkGradient';

export class Dashboard extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false

  state: any = {
    teams: [],
    teamsLoaded: false
  }

  componentDidMount(): any {
    this._isMounted = true;
    Profile.dbProfile().then((profile: Profile) => profile.id)
      .then((profileId: string) => Team.allTeams(profileId))
      .then((teams: Team[]) => {
        if (teams && teams instanceof Array) this.setState({ teams: teams });
        this.setState({ teamsLoaded: true })
      }).catch(err => console.log('Error getting profile:', err));
  }

  componentWillUnmount(): any {
    this._isMounted = false;
  }

  render(): any {
    return (
      <View style={[vars.screenView, styles.dashboardView]}>
        <BasicHeader title="Your Teams"/>

        <ScrollView>
          { this.state.teamsLoaded ? <View style={styles.dashboardCards}>

            { this.state.teams.length ? this.state.teams.map((team: Team, index: number) => (
              <TouchableOpacity onPress={() => navigate('ViewTeam', { team })} style={styles.dashboardCard} key={index}>
                {/* <View style={styles.dashboardCard} key={index}> */}
                  <MaterialCommunityIcons color="white" size={30} name="soccer" style={styles.cardIcon}/>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{team.title}</Text>
                    <Text style={styles.cardSubtitle}>{team.players.length} Players</Text>
                  {/* </View> */}
                </View>
              </TouchableOpacity>
              )) : <View><Text style={styles.cardTitle}>No Teams</Text></View> }

          </View> : null }
        </ScrollView>
        <DarkGradient/>
      </View>
    )
  }

}

const styles = StyleSheet.create({

  dashboardView: {
    // backgroundColor: 'black',
    // backgroundColor: vars.bgColor
    // backgroundColor: '#D2D2D4'
    // backgroundColor: '#D5DAE2'
  },
  newTeamButton: {
    // backgroundColor: vars.primaryColor,
  },

  dashboardCards: {
    marginTop: 32,
    flex: 1,
    alignItems: 'center',
    // backgroundColor: vars.primaryColor,
    // marginHorizontal: 16,
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
  },

  cardTitle: {
    // fontFamily: 'roboto-medium',
    fontFamily: 'roboto-bold',
    fontSize: 22,
    color: '#fff',
    // marginLeft: 20

  },
  cardSubtitle: {
    fontFamily: 'roboto-light',
    fontSize: 16,
    color: '#fff',
    // marginLeft: 20
  },
  // '[cardTitle, cardSubtitle]': {
    // marginLeft: 20
  // },

  dashboardCard: {
    width: '90%',
    backgroundColor: '#4f677a80',
    borderRadius: 8,
    // height: 100,
    paddingVertical: 25, 
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...vars.cardElevation
  },
  cardContent: {
    marginLeft: 20
  },
  cardIcon: {
    marginLeft: 20
  }

})

