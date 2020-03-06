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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import DarkGradient from '@components/DarkGradient';

export class ViewTeam extends React.Component {

  state: any = {
    currentTeam: null,
    allTeams: null
  }
  props: any;

  componentDidMount(): void {
    let { team } = this.props.route.params;
    this.setState({ currentTeam: team });
  }

  render(): any {

    let { team } = this.props.route.params;
    return (
      <View style={[vars.screenView]}>
        <TeamHeader team={team}/>
        <DarkGradient/>
      </View>

    )
  }

}