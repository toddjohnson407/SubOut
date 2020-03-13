import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, Dimensions, Animated, TouchableOpacityBase } from 'react-native';

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
import SetupGame from '@components/SetupGame';


export function ViewTeam(props) {
  const isFocused = useIsFocused();
  return <ViewTeamScreen {...props} isFocused={isFocused}/>;
}

export class ViewTeamScreen extends React.Component {

  props: any;

  state: any = {
    rosterExpaned: false,
    activeNavIndex: 1
  }

  navOpts: any[] = ['Overview', 'Roster', 'Settings'];
  // activeNav: string = 'Overview';

  componentDidMount(): void {
    // this.setState({ animationValue: new Animated.Value(100) })
  }

  viewRoster(): any {
    // this.setState((prevState: any) => ({ currentHeight: prevState.currentHeight === 100 ? 400 : 100 }))
    // navigate('ViewRoster', { players: this.props.route.params.currentTeam.players })
  }

  newGame(): any {

  }

  navigateSection(newIndex: number): void {
    this.setState({ activeNavIndex: newIndex });
  }

  render(): any {
    let { currentTeam, allTeams } = this.props.route.params;
    let { players } = currentTeam;
    let { isFocused } = this.props;
    let specs = [
      { name: 'Game Duration', value: currentTeam.gameDuration, unit: 'Minutes',
        icon: <MaterialIcons name="timer" size={35} color={vars.primaryColor}/>
      // icon: <Feather name="clock" size={35} color={vars.primaryColor}/>
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
      },
      { name: 'Total', value: currentTeam.players.length, unit: 'Players',
        icon: <MaterialCommunityIcons name="clipboard-outline" size={35} color={vars.primaryColor}/>
      },
      { name: 'Played', value: 0, unit: 'Games',
        icon: <MaterialCommunityIcons name="folder-clock-outline" size={35} color={vars.primaryColor}/>
      },
    ]
    return (
      <View style={[vars.screenView, styles.teamView]}>
        <TeamHeader team={currentTeam} allTeams={allTeams}/>

        <View style={styles.sectionNavContainer}>
          { this.navOpts.map((nav: any, index: number) => (
            <TouchableOpacity style={styles.sectionNav} onPress={() => this.navigateSection(index)} key={index}>
              <Text style={[styles.sectionNavText, index === this.state.activeNavIndex && { color: vars.primaryColor }]}>{nav}</Text>
            </TouchableOpacity>
          ))}
        </View>


          { this.state.activeNavIndex === 0 ? (
            <View style={[styles.contentCard, styles.teamOverview]}>
              <ScrollView>
                <View style={{ marginBottom: 100, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                  { specs && specs.length ? specs.map(({name, value, unit, icon}, index: number) => <View key={index} style={styles.teamSpec}>
                    <IconButton onPress={() => null}>{icon}</IconButton>
                    <View style={styles.specValueContainer}>
                      <Text style={[styles.specName, {fontSize: 18, marginTop: 0, fontFamily: 'roboto-bold'}]}>{value} {unit}</Text>
                    </View>
                    <Text style={styles.specName}>{name}</Text>
                  </View> ) : null }
                </View>
              </ScrollView>
            </View>
          ) : this.state.activeNavIndex === 1 ? (
            <View style={[styles.contentCard, styles.rosterCard]}>
              <View style={{flex: 1, marginHorizontal: 24, marginBottom: 100, paddingVertical: 16 }}>
                <ScrollView>
                  { players && players.length ? [...players, ...players].map(({name}, index: number) => (<View key={index} style={styles.player}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialIcons name="person" size={30} color={vars.primaryColor}/>
                      <Text style={styles.playerName}>{name}</Text>
                    </View>
                    <IconButton onPress={() => null}>
                      <MaterialIcons name="more-horiz" size={35} color={vars.primaryColor}/>
                    </IconButton>
                  </View>)) : null }
                </ScrollView>
              </View>
            </View>
          ) : <View style={{flex: 1}}></View> }



        { isFocused && <SetupGame team={currentTeam}/> }

        {/* <ViewRoster players={currentTeam.players}/> */}

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
    // flex: 1.5,
    // backgroundColor: '#4f677a',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 16
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#4f677a',
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    marginTop: 24
  },
  rosterCard: {
  },
  player: {
    // backgroundColor: '#fff',
    backgroundColor: vars.bgColor + 'f0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  playerName: {
    fontSize: 20,
    color: vars.primaryColor,
    fontFamily: 'roboto-regular',
    marginLeft: 8
  },

  sectionNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    // height: 50,
    // flex: 0.25,
    marginBottom: 16,
    borderRadius: 24,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  
  sectionNav: {
    // borderRadius: 24,
    // backgroundColor: '#fff',
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  sectionNavText: {
    // color: vars.primaryColor,
    color: vars.bgColor,
    fontFamily: vars.headerFont,
    fontSize: 18
  },

  teamSpec: {
    width: '45%',
    // backgroundColor: '#fff',
    backgroundColor: vars.bgColor,
    margin: 8,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...vars.cardElevation
  },
  specIcon: {
    // marginVertical: 24
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
