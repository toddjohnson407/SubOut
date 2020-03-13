import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

import Profile from '@utils/db/Profile';

import BasicButton from '@components/BasicButton';
import { BasicHeader } from '@components/BasicHeader';
import { navigate } from '@base/src/RootNavigation';
import { Team } from '@utils/db/Team';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import * as vars from '@base/variables'
import DarkGradient from '@components/DarkGradient';
import IconButton from '@components/IconButton';

import moment from 'moment';

const formatNumber = (number: number) => `0${number}`.slice(-2);

const getRemaining = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export class ActiveGame extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false

  interval: any;

  state: any = {
    subs: [],
    remainingSeconds: 0,
    clockRunning: false,
    started: false,
    activePlayers: [],
    fieldSheets: [],
    activeFieldSheetIndex: 0
  }

  props: any;

  componentDidMount(): any {
    this._isMounted = true;
    let { game } = this.props.route.params;
    this.setState({ remainingSeconds: +game.opts.gameDuration * 60 })
    this.calculateSubstitutions();
  }


  componentWillUnmount(): any {
    this._isMounted = false;
    clearInterval(this.interval);
  }

  calculateSubstitutions(): any {
    let { game } = this.props.route.params;
    let allPlayers = game.players;
    let { playersOnField, gameDuration, subFrequency, playersPerSub } = game.opts;
    
    let activePlayers = allPlayers.slice(0, playersOnField).map(({name}) => name);
    this.setState({ activePlayers });
    
    let fieldSheets = [activePlayers]
    let subCount = Math.floor(gameDuration / subFrequency);
    for (let i = 1; i < subCount; i++) {
      let prevSheet = fieldSheets[i - 1];

      let newPlayersStartingIndex = allPlayers.findIndex(({name}) => name === prevSheet[playersOnField - 1]) + 1;
      let newSheet = [...prevSheet.slice(playersPerSub), ...allPlayers.slice(newPlayersStartingIndex, newPlayersStartingIndex + playersPerSub).map(({name}) => name)];
      
      if (newSheet.length < playersOnField) {
        let missingPlayerCount = playersOnField - newSheet.length;
        newSheet.push(...allPlayers.slice(0, missingPlayerCount).map(({name}) => name));
      }
      
      fieldSheets.push(newSheet);
    }
    this.setState({ fieldSheets });
  }

  updateTimer = (): any => {
    this.setState({ started: true })
    this.interval = setInterval(() => {
      if (this.state.remainingSeconds <= 0 || !this.state.clockRunning) clearInterval(this.interval)
      else this.setState((prevState: any) => ({ remainingSeconds: prevState.remainingSeconds - 1 }));
    }, 1000);
  }

  toggleClock = (): any => {
    this.setState((prevState: any) => ({ clockRunning: !prevState.clockRunning }));
    if (this.state.clockRunning || !this.state.started) this.updateTimer();
  }

  render(): any {

    let { mins, secs } = getRemaining(this.state.remainingSeconds);

    let { fieldSheets, activeFieldSheetIndex } = this.state;
    let { game } = this.props.route.params;
    let allPlayers = game.players;
    let { playersOnField, gameDuration, subFrequency, playersPerSub } = game.opts;

    return (
      <View style={[vars.screenView, styles.activeGameView]}>

        <View style={styles.clockContainer}>
          <View style={styles.clock}>
            <Text style={styles.clockText}>{mins}:{secs}</Text>
          </View>
          <View style={styles.toggleClock}>
            <IconButton onPress={this.toggleClock}>
              <MaterialIcons name={this.state.clockRunning ? 'pause' : 'play-arrow'} color={'#fff'} size={60}/>
            </IconButton>
          </View>
        </View>

        <View style={styles.playersOnField}>
          <Text style={{ color: '#000', fontFamily: 'roboto-medium', fontSize: 22, marginBottom: 8 }}>Players on the Field</Text>
          <ScrollView>

            { this.state.activePlayers.length ? this.state.activePlayers.map((name: any, index: number) => (
              <View key={index} style={styles.activePlayer}>
                <Text style={styles.activePlayerText}>{name}</Text>
                { index < playersPerSub ? (<Text style={styles.outNext}>Out Next</Text>) : (<Text style={[styles.outNext, { color: vars.bgColor }]}>Staying In</Text>) }
              </View>
            )) : null }
          </ScrollView>
        </View>

        <View style={[styles.playersOnField]}>
          <Text style={{ color: '#000', fontFamily: 'roboto-medium', fontSize: 22, marginBottom: 8 }}>Coming In</Text>
          <ScrollView>
            { (fieldSheets.length && fieldSheets[activeFieldSheetIndex + 1].length) ? fieldSheets[activeFieldSheetIndex + 1].slice(playersOnField - playersPerSub).map((name: any, index: number) => (
              <View key={index} style={styles.activePlayer}>
                <Text style={styles.activePlayerText}>{name}</Text>
              </View>
            )) : null }
          </ScrollView>
        </View>

        {/* <View style={styles.nextUp}>
          <Text style={{ color: '#fff', fontFamily: 'roboto-regular', fontSize: 22, textAlign: 'center' }}>Next Sub at 18:00</Text>
          <View style={styles.inOutContainer}>
            <View style={styles.nextSection}>
              <Text style={styles.nextSectionTitle}>Coming Out</Text>
              { this.state.activePlayers.length ? this.state.activePlayers.slice(0, playersPerSub).map((name: any, index: number) => (
                <Text key={index} style={styles.nextText}>{name}</Text>
              )) : null }
            </View>
            <View style={styles.nextSection}>
              <Text style={styles.nextSectionTitle}>Coming In</Text>
              { fieldSheets.length && fieldSheets[activeFieldSheetIndex + 1].length ? fieldSheets[activeFieldSheetIndex + 1].slice(playersOnField - playersPerSub).map((name: any, index: number) => (
                <Text key={index} style={styles.nextText}>{name}</Text>
              )) : null }
            </View>
          </View>
        </View> */}
        <DarkGradient/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  activeGameView: {
    justifyContent: 'flex-end',
    // alignItems: 'flex-end'
  },
  outNext: {
    color: vars.primaryColor,
    fontFamily: vars.headerFont,
    fontSize: 18
  },
  inOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  nextSection: {
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 8
  },
  nextSectionTitle: {
    color: '#fff',
    fontFamily: 'roboto-medium',
    fontSize: 24,
    paddingVertical: 4,
  },
  nextText: {
    color: '#fff',
    fontFamily: 'roboto-light',
    fontSize: 20,
    paddingVertical: 2,
  },
  playersOnField: {
    justifyContent: 'center',
    alignItems: 'stretch',
    ...vars.cardElevation,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginVertical: 8,
    borderRadius: 8
  },
  activePlayer: {
    paddingVertical: 5,
    // marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: vars.bgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activePlayerText: {
    color: '#000',
    fontFamily: 'roboto-light',
    fontSize: 18
  },

  clockContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  clock: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  clockText: {
    color: '#fff',
    fontFamily: 'roboto-light',
    fontSize: 80
  },
  toggleClock: {

  },

  nextUp: {
    backgroundColor: vars.primaryColor,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16
  }

})

