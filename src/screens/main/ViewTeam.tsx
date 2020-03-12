import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, Dimensions, Animated } from 'react-native';

import Profile from '@utils/db/Profile';

import * as vars from '@base/variables'
import BasicButton from '@components/BasicButton';
import { TeamHeader } from '@components/TeamHeader';
import { NewTeam } from './NewTeam';
import { BasicHeader } from '@components/BasicHeader';
import { navigate } from '@base/src/RootNavigation';
import { Team } from '@utils/db/Team';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import DarkGradient from '@components/DarkGradient';
import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';
import { useIsFocused } from '@react-navigation/native';
import IconButton from '@components/IconButton';
import { ViewRoster } from './ViewRoster';


export function ViewTeam(props) {
  const isFocused = useIsFocused();
  return <ViewTeamScreen {...props} isFocused={isFocused}/>;
}

export class ViewTeamScreen extends React.Component {

  props: any;

  state: any = {
    rosterExpaned: false
  }

  componentDidMount(): void {
    // this.setState({ animationValue: new Animated.Value(100) })
  }

  viewRoster(): any {
    // this.setState((prevState: any) => ({ currentHeight: prevState.currentHeight === 100 ? 400 : 100 }))
    // navigate('ViewRoster', { players: this.props.route.params.currentTeam.players })
  }

  newGame(): any {

  }

  render(): any {
    let { currentTeam, allTeams } = this.props.route.params;
    let { isFocused } = this.props;
    let specs = [
      { name: 'Game Duration', value: currentTeam.gameDuration, unit: 'Minutes',
        icon: <Feather name="clock" size={35} color={vars.primaryColor}/>
      },
      { name: 'On the Field', value: currentTeam.playersOnField, unit: 'Players',
        // icon: <MaterialIcons name="group" size={35} color={vars.primaryColor}/>
        icon: <MaterialCommunityIcons name="soccer-field" size={35} color={vars.primaryColor}/>
      },
      { name: 'Per Substitution', value: currentTeam.playersPerSub, unit: 'Players',
        icon: <MaterialCommunityIcons name="whistle" size={35} color={vars.primaryColor}/>
      },
      { name: 'Sub Frequency', value: currentTeam.subFrequency, unit: 'Minutes',
        icon: <MaterialCommunityIcons name="timer-sand" size={35} color={vars.primaryColor}/>
        // icon: <MaterialIcons name="timer" size={35} color={vars.primaryColor}/>
      },
    ]
    return (
      <View style={[vars.screenView, styles.teamView]}>
        <TeamHeader team={currentTeam} allTeams={allTeams}/>

        <View style={styles.teamOverview}>
          { specs && specs.length ? specs.map(({name, value, unit, icon}, index: number) => <View key={index} style={styles.teamSpec}>
            <IconButton onPress={() => null}>{icon}</IconButton>
            <View style={styles.specValueContainer}>
              <Text style={[styles.specName, {fontSize: 18, marginTop: 8, fontFamily: 'roboto-bold'}]}>{value} {unit}</Text>
            </View>
            <Text style={styles.specName}>{name}</Text>
          </View> ) : null } 
        </View>


        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.action} onPress={() => this.viewRoster()}>
            {/* <MaterialIcons name="play-circle-outline" size={35} color={'#fff'}/> */}
            <Text style={{ marginLeft: 16, fontSize: 20, color: '#fff', fontFamily: 'roboto-bold'}}>Start Game</Text>
          </TouchableOpacity>
        </View>

        <ViewRoster players={currentTeam.players}/>

        <DarkGradient/>
        
        { !isFocused && <BlurView tint="dark" intensity={95} style={{ position: 'absolute', left: 0, right: 0, top: 0, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}/> }
      </View>
    )
  }
}

let styles = StyleSheet.create({
  teamView: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  teamOverview: {
    flex: 1.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  actionContainer: {
    marginHorizontal: 24,
    backgroundColor: '#4f677a',

    paddingVertical: 24,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  },
  action: {
    width: '100%',
    backgroundColor: vars.primaryColor,

    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  teamSpec: {
    width: '45%',
    backgroundColor: '#fff',
    margin: 8,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...vars.cardElevation
  },
  specIcon: {
    marginVertical: 24
  },
  specName: {
    color: vars.primaryColor,
    fontSize: 14,
    textAlign: 'center',
  }, 
  specValueContainer: {
    alignItems: 'center',
  },
  specValue: {
    color: vars.primaryColor,
    fontSize: 32,
    textAlign: 'center',
  }
})
