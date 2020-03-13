import React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { primaryColor, headerFont } from '@base/variables';
import SlidingUpPanel from 'rn-sliding-up-panel';

import * as vars from '@base/variables';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import IconButton from './IconButton';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TeamPlayer } from '@utils/db/Team';
import BasicButton from './BasicButton';

import DraggableFlatList from "react-native-draggable-flatlist";
import { Game, GamePlayer } from '@utils/db/Game';
import { db } from '../config';
import { navigate } from '../RootNavigation';

let modalStatus = (isMinimized: boolean) => {
  console.log('is minimized:', isMinimized)
}

export default class SetupGame extends React.Component {
  
  _panel: any;
  props: any;

  formSteps: any[];
  maxSteps: number = 2;

  modalHeight: number = Dimensions.get('screen').height / 1.15;

  state: any = {
    isMinimized: false,
    gamePlayers: [],
    step: 1
  }

  componentDidMount(): void {
    Game.getActiveGame().then(game => console.log(game));
    this.setState({ gamePlayers: this.props.team.players.slice(0, 10) })
    // db.collection('games').where('teamId', '==', this.props.team.id).withConverter(Game.gameConverter).get()
    //   .then(({docs}) => docs.forEach((doc, i) => {
    //     console.log('doc id:', doc.id)
    //     i === 0 && Game.storeActiveGameId(doc.id).then(_ => console.log('Stored'))
    //   }))
  }

  /** Starts the new game */
  startGame = (): any => {
    let gamePlayers: GamePlayer[] = this.state.gamePlayers.map(({name}) => new GamePlayer(name));
    let game = new Game(this.props.team.id, gamePlayers, { relatedTeam: this.props.team });

    console.log('Creating Game instance:', game);
    db.collection('games').doc().withConverter(Game.gameConverter).set(game)
      .then(_ => navigate('ActiveGame', { game }))
      .catch(err => console.log('Error creating test team:', err))
  }

  nextStep = (): any => {
    if (this.maxSteps > this.state.step) {
      this.setState((prevState: any) => ({ step: prevState.step + 1 }));
    } else {
      this.startGame();
    }
  }

  prevStep = (): any => {
    if (this.state.step > 1) {
      this.setState((prevState: any) => ({ step: prevState.step - 1 }));
    } 
  }

  /** Sets minimized status based on the momentum position of a gesture */
  modalGravity = (position: number) => {
    let isMinimized = (position < 250) ? true : false;
    if (isMinimized !== this.state.isMinimized) this.setState({ isMinimized });
  }

  /** Set the modal status as minimized */
  setMinimized = () => !this.state.isMinimized && this.setState({ isMinimized: true });

  /** Expands this modal to its full height */
  expand = () => {
    this._panel.show(this.modalHeight);
    this.setState({ isMinimized: false });
  }

  /** Returns a boolean that indicates whether or not the given player 
   * is playing in the new game being set up
   */
  isActive = (playerIndex: number): boolean => {
    if (!this.state.gamePlayers.length) return false;
    return this.state.gamePlayers.findIndex(({name}) => name === this.props.team.players[playerIndex].name) !== -1;
  }

  /** Toggles the player from the gamePlayers array based on their prop index */
  playerStatus = (playerIndex: number) => {
    let player = this.props.team.players[playerIndex];
    if (!this.state.gamePlayers.length) this.setState({ gamePlayers: [player] })
    
    else this.setState((prevState: any) => {
      let gamePlayers: any[];
      let activeIndex = this.state.gamePlayers.findIndex(({name}) => name === player.name)

      if (activeIndex !== -1) gamePlayers = [...prevState.gamePlayers].filter((player: TeamPlayer, index: number) => index !== activeIndex)
      else gamePlayers = [...prevState.gamePlayers, player];

      return { gamePlayers }
    })
  }

  /** Returns a player as a draggable React Component */
  draggablePlayer = ({ item, index, drag, isActive }) => (
    <TouchableWithoutFeedback 
      onPressIn={drag} 
      key={index} 
      style={[styles.player, { backgroundColor: vars.bgColor, borderColor: '#fff0' }]} 
    >
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialIcons name="person" size={35} color={'#fff'}/>
        <Text style={styles.playerName}>{item.name}</Text>
      </View>
      <MaterialIcons name="view-headline" size={25} color={'#fff'} />
    </TouchableWithoutFeedback>
  );

  /** Rearranges the order of gamePlayers */
  rearrangePlayers = (data: any) => {
    this.setState({ gamePlayers: data })
  }

  render(): any {
    let { isMinimized } = this.state;
    // let players = this.props.team.players.map((player: any) => ({...player, active: false}));
    let { players } = this.props.team;
    // console.log(players);
    return (
      <SlidingUpPanel ref={c => this._panel = c} height={700} 
        draggableRange={{
          top: this.modalHeight,
          bottom: 100
        }}
        snappingPoints={[100, this.modalHeight]}
        onBottomReached={this.setMinimized}
        friction={0.75}
        onMomentumDragEnd={this.modalGravity}
      >
        { dragHandler => (
          <View style={{backgroundColor: vars.primaryColor, justifyContent: 'space-between', height: this.modalHeight, borderTopLeftRadius: 24, borderTopRightRadius: 24}}>

            { isMinimized ? (<View style={styles.headerContainer} {...dragHandler}>
              <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'roboto-regular', marginLeft: 32 }}>Setup a New Game</Text>
              <TouchableOpacity style={styles.header} onPress={this.expand}>
                <Text style={{ fontSize: 20, color: vars.primaryColor, fontFamily: 'roboto-bold'}}>Start</Text>
              </TouchableOpacity>
            </View>) : (
            <View style={[styles.headerContainer, styles.expandedHeader]} {...dragHandler}>
              <Text style={{ fontSize: 28, color: '#fff', fontFamily: 'roboto-bold' }}>New Game Setup</Text>
            </View> )}
            
            { !isMinimized && (<SafeAreaView style={{flex: 10}}>
              <View style={[styles.sectionContainer, { display: this.state.step === 1 ? 'flex' : 'none' }]}>
                <Text style={styles.sectionHeader}>Select participating players</Text>
                <ScrollView>
                  <View style={styles.selectPlayers}>

                    { players && players.length ? players.map((player: any, index: number) => (<TouchableWithoutFeedback 
                      key={index} 
                      style={[styles.player, this.isActive(index) && { backgroundColor: vars.bgColor, borderColor: '#fff0' }]} 
                      onPress={() => this.playerStatus(index)}
                    >
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcons name="person" size={35} color={this.isActive(index) ? '#fff' : '#fff9'}/>
                        <Text style={[styles.playerName, { color: this.isActive(index) ? '#fff' : '#fff9' }]}>{player.name}</Text>
                      </View>
                      <MaterialCommunityIcons 
                        name={this.isActive(index) ? 'checkbox-blank-circle' : 'checkbox-blank-circle-outline'} 
                        // color={'#fff'}
                        color={this.isActive(index) ? '#fff' : '#fff9'}
                        style={{marginRight: 4}} 
                        size={25} 
                      />
                    </TouchableWithoutFeedback> )) : null }
                  </View>
                </ScrollView>
              </View>

              { this.state.gamePlayers && <View style={[styles.sectionContainer, { display: this.state.step === 2 ? 'flex' : 'none' }]}>
                <Text style={styles.sectionHeader}>Customize the order of your roster</Text>
                <View style={styles.selectPlayers}>
                  <DraggableFlatList 
                    data={this.state.gamePlayers}
                    renderItem={this.draggablePlayer}
                    keyExtractor={(item: any, index: number) => `draggable-item-${index}`}
                    onDragEnd={({data}) => this.rearrangePlayers(data)}
                    // onDragEnd={({ data }) => this.setState({ gamePlayers: data })}
                  />
                </View>
              </View> }

              <View style={styles.actions}>
                { this.state.step !== 1 ? <TouchableOpacity
                  disabled={this.state.step === 1} 
                  onPress={this.prevStep} 
                  style={[styles.stepBackButton, {
                    backgroundColor: this.state.step !== 1 ? 'white' : '#fff7'
                  }]}
                >
                  <MaterialIcons size={48} name="keyboard-arrow-left" color={vars.primaryColor}/>
                </TouchableOpacity> : null }
                <BasicButton title={this.state.step !== this.maxSteps ? 'Continue' : 'Submit'} style={styles.continueButton} textStyle={styles.continueButtonText} onPress={() => this.nextStep()}/>
              </View>

            </SafeAreaView>)}
          </View>
        )}

      </SlidingUpPanel>
    )
  }

}

const styles = StyleSheet.create({
  setupGameView: {

  },
  selectPlayers: {
    flex: 1,
    // height: 100,
    // marginHorizontal: 24,
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  sectionContainer: {
    flex: 4,
    marginBottom: 16,
  },

  sectionHeader: {
    fontSize: 18,
    fontFamily: 'roboto-regular',
    marginLeft: 32,
    color: '#fff'
  },

  player: {
    backgroundColor: '#4f677a',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  playerName: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'roboto-regular',
    marginLeft: 8
  },
  
  expandedHeader: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: vars.primaryColor,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  header: {
    height: '100%',
    backgroundColor: '#fff',
    marginRight: 16,
    borderRadius: 24,
    paddingHorizontal: 40,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },


  actions: {
    flex: 0.5,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24
  },

  continueButton: {
    flex: 4,
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
    height: 48
    // width: '85%',
    // borderRadius: 0,
    // backgroundColor: 'white',
    // color: vars.primaryColor
  },
  continueButtonText: {
    color: vars.primaryColor,
    fontFamily: vars.headerFont,
    // flex: 1
    
  },
  stepBackButton: {
    // backgroundColor: 'transparent',
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 4,
    // borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 12,
  }
});
