import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, Dimensions } from 'react-native';

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
import { BlurView } from 'expo-blur';

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
    let { currentTeam, allTeams } = this.props.route.params;
    this.setState({ currentTeam, allTeams });
    // this.setState({ currentTeam, allTeams: [...allTeams, ...allTeams] });
  }

  render(): any {

    let { currentTeam: team } = this.props.route.params;
    return (

      <SafeAreaView style={[vars.screenView, styles.selectTeamView]}>
        <View style={styles.teamSelectHeader}>
          <Text style={styles.teamText}>All Teams</Text>
        </View>

        <View style={{ 
          height: this.state.allTeams ? this.state.allTeams.length * 88 : 0,
          maxHeight: 420 //blaze it,
        }}>
          <ScrollView>
            { this.state.allTeams ? this.state.allTeams.map((team: Team, index: number) => (
              <TouchableOpacity onPress={() => navigate('ViewTeam', { team })} style={[styles.dashboardCard]} key={index}>
                <MaterialCommunityIcons color="white" size={30} name="soccer" style={styles.cardIcon}/>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{team.title}</Text>
                  <Text style={styles.cardSubtitle}>{team.players.length} Players</Text>
                </View>
              </TouchableOpacity>
            )) : null }
          </ScrollView>
        </View>

        <View style={{justifyContent: 'flex-start', marginHorizontal: 16}}>
          <BasicButton title="New Team" onPress={() => navigate('NewTeam', null)} style={styles.newTeamButton} textStyle={styles.newTeamButtonText}/>
        </View>
        {/* <DarkGradient/> */}
      </SafeAreaView>

    )
  }

}

const styles = StyleSheet.create({
  newTeamButton: {
    backgroundColor: vars.primaryColor + 'c0',
    // backgroundColor: '#4f677a80',
    borderWidth: 0,
    width: '100%',
    // height: 80,
    marginTop: 4,
    alignSelf: 'center',
    marginBottom: 0,
  },
  newTeamButtonText: {
    // fontFamily: vars.headerFont,
    fontFamily: 'roboto-light',
    fontSize: 22
  },
  selectTeamView: {
    // backgroundColor: 'pink',
    justifyContent: 'center',
    // padding: 50,
    // height: 500,
    // height: Dimensions.get('screen').height / 1.65,

    // alignSelf: 'center',
  },
  teamSelectHeader: {
    width: '100%',
    // flex: 1,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: vars.primaryColor
  },
  teamText: {
    fontSize: 34,
    fontFamily: 'roboto-light',
    color: '#fff',
    // fontFamily: vars.headerFont,
    // color: vars.primaryColor
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
    borderRadius: 4,
    // borderBottomWidth: 1,
    // borderColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    height: 80,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    marginLeft: 20
  },
  cardIcon: {
    marginLeft: 20
  }
})