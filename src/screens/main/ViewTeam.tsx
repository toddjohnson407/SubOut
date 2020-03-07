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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import DarkGradient from '@components/DarkGradient';
import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';
import { useIsFocused } from '@react-navigation/native';


export function ViewTeam(props) {
  const isFocused = useIsFocused();
  return <ViewTeamScreen {...props} isFocused={isFocused}/>;
}

export class ViewTeamScreen extends React.Component {

  state: any = {
    currentTeam: null,
    allTeams: null
  }

  props: any;

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
  }

  render(): any {
    let { team } = this.props.route.params;
    let { isFocused } = this.props;
    console.log(isFocused);
    return (
      <View style={[vars.screenView, {backgroundColor: vars.bgColor}]}>
        { this.state.allTeams && <TeamHeader team={team} allTeams={this.state.allTeams}/> }
        
        <DarkGradient/>
       { !isFocused && <BlurView tint="dark" intensity={95} style={{ position: 'absolute', left: 0, right: 0, top: 0, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}/> }
      </View>

    )
  }
}
