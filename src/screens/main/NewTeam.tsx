import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, Dimensions, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';

import * as vars from '@base/variables'
import { BasicHeader } from '@components/BasicHeader';
import { createFormField } from '@utils/FormUtils';
import BasicTextField from '@components/BasicTextField';
import BasicTextField2 from '@components/BasicTextField2';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BasicButton from '@components/BasicButton';
import { Team, TeamPlayer } from '@utils/db/Team';

import { auth, createTimestamp, db } from '@base/src/config';
import Profile from '@utils/db/Profile';
import { navigate } from '@base/src/RootNavigation';

export class NewTeam extends React.Component {

  maxSteps: number = 2;

  formSteps: any[];

  state: any = {
    step: 1,
    newPlayerName: '',
    players: [],
    // players: ['Jack', 'Linz', 'Parker'],
    newTeamForm: [
      createFormField('title', 'Title', { autoCapitalize: 'words' }),
      createFormField('gameDuration', 'Minutes in a Game', { keyboardType: 'number-pad' }),
      createFormField('playersOnField', 'Players on Field', { keyboardType: 'number-pad' }),
      createFormField('playersPerSub', 'Players Per Sub', { keyboardType: 'number-pad' }),
      createFormField('subFrequency', 'Sub Frequency', { keyboardType: 'number-pad' })
    ]
  }

  /** Updates a form field value by its index */
  handleFormUpdate(fieldIndex: number, newValue: any, firstForm: boolean = false): void {
    let formName = firstForm ? 'newTeamForm' : 'playersForm'

    this.setState((prevState: any) => {
      let formCopy = [...prevState[formName]];
      // formCopy[fieldIndex] = { ...formCopy[fieldIndex], value: newValue };
      formCopy[fieldIndex]['opts']['value'] = newValue
      return ({ [formName]: formCopy })
    });
  }

  async componentDidMount() {

  }


  nextStep = (): any => {
    if (this.maxSteps > this.state.step) {
      this.setState((prevState: any) => ({ step: prevState.step + 1 }));
    } else {
      this.createTeam();
    }
  }

  prevStep = (): any => {
    if (this.state.step > 1) {
      this.setState((prevState: any) => ({ step: prevState.step - 1 }));
    } 
  }

  removePlayer = (player: any): void => {
    this.setState((prevState: any) => {
      let players = [...prevState.players];
      let playerIndex = prevState.players.indexOf(player);

      players.splice(playerIndex, 1);
      return { players };
    });
  }

  newPlayer = (): void => {
    this.setState((prevState: any) => {
      return {
        newPlayerName: '',
        players: [...prevState.players, prevState.newPlayerName]
      }
    });
  }

  /** Validates new team form */
  isValid = (): boolean => {
    return true;
  }

  /** Sends newly created team to database */
  createTeam = async (): Promise<void> => {
    if (this.isValid()) {
      this.createTestTeam()
      // let teamPlayers: TeamPlayer[] = this.state.players.map(player => new TeamPlayer(player));
      // let profile = await Profile.dbProfile();
      // let newTeam = new Team(profile.id, this.state.newTeamForm[0].value, teamPlayers, this.state.newTeamForm[1].value, this.state.newTeamForm[2].value, this.state.newTeamForm[3], this.state.newTeamForm[4]);
    }
  }


  createTestTeam = async (): Promise<void> => {
    let profile = await Profile.dbProfile();

    let testPlayers = [
      new TeamPlayer('Todd'),
      new TeamPlayer('Zac'),
      new TeamPlayer('Chad'),
      new TeamPlayer('Lucy'),
      new TeamPlayer('Jack'),
      new TeamPlayer('Will'),
      new TeamPlayer('Lindsey'),
    ]

    let testTeam = new Team(profile.id, 'Test Team', testPlayers, 60, 5, 2, 10);

    db.collection('teams').doc().withConverter(Team.teamConverter).set(testTeam)
      .then(_ => console.log('Test Team created'))
      .catch(err => console.log('Error creating test team:', err))
  }

  render() {
    return (
      <View style={[vars.screenView, styles.newTeamView]}>
        <BasicHeader title="New Team" useCloseButton={true}/>

        <KeyboardAvoidingView style={styles.teamForm} behavior="padding" keyboardVerticalOffset={-100}>

          <ScrollView>
              <View style={{ display: this.state.step === 1 ? 'flex' : 'none' }}>
                { this.state.newTeamForm.map((field: any, index: number) => {
                  return (
                    <BasicTextField
                      key={field.key}
                      label={field.label}
                      secureTextEntry={field.opts.isSecure}
                      autoCapitalize={field.opts.autoCapitalize}
                      keyboardType={field.opts.keyboardType}
                      value={field.opts.value}
                      returnKeyType={field.opts.returnKeyType}
                      onChangeText={newVal => this.handleFormUpdate(index, newVal, true) } 
                    />
                  );
                }) }
              </View>
              <View style={{ display: this.state.step !== 1 ? 'flex' : 'none' }}>
                <View style={styles.playersListContainer}>
                  <Text style={styles.playersListTitle}>{!this.state.players.length && 'No'} Players</Text>
                  <View style={styles.playersList}>
                    { this.state.players.map((player: any, index: number) => {
                      return (
                        <View style={styles.player} key={index}>
                          <TouchableOpacity
                            disabled={this.state.step === 1} 
                            onPress={() => this.removePlayer(player)} 
                            style={styles.removePlayerButton}
                          >
                            <Ionicons size={35} name="ios-close" color={vars.primaryColor}/>
                          </TouchableOpacity>
                          <Text style={{ marginLeft: 8, color: vars.primaryColor, fontSize: 20, textAlign: 'center', fontFamily: vars.headerFont }}>{player}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>

                <View style={styles.playerField} >
                  <BasicTextField2
                    key="New Player"
                    label="Add Player"
                    onSubmitEditing={(_: any) => this.newPlayer()}
                    value={this.state.newPlayerName}
                    // containerStyle={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    autoCapitalize="words"
                    returnKeyType="done"
                    onChangeText={newPlayerName => this.setState({ newPlayerName }) } 
                  />
                </View>
              </View>
          </ScrollView>
        </KeyboardAvoidingView>

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
      </View>
      
    )
  }

}



const styles = StyleSheet.create({
  newTeamView: {
    backgroundColor: vars.primaryColor
  },
  teamForm: {
    width: '85%',
    alignSelf: 'center',
    flex: 3
  },
  playersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  playersListTitle: {
    fontSize: 28,
    fontFamily: vars.headerFont,
    marginVertical: 4,
    color: '#fff',
    marginLeft: 12
  },
  playersListContainer: {
    backgroundColor: '#fff3',
    paddingVertical: 8,
  },
  player: {
    // borderBottomWidth: 3,
    backgroundColor: '#fff',
    marginVertical: 6,
    marginLeft: 12,
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  playerField: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  removePlayerButton: {
    // flex: 1,
    // backgroundColor: 'transparent',
    backgroundColor: '#fff9',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'transparent',
    // paddingHorizontal: 16,
    // height: 60,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  actions: {
    flex: 1,
    // justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  continueButton: {
    flex: 4,
    backgroundColor: '#fff',
    padding: 5
    // width: '85%',
    // borderRadius: 0,
    // backgroundColor: 'white',
    // color: vars.primaryColor
  },
  continueButtonText: {
    color: vars.primaryColor,
    fontFamily: vars.headerFont
  },
  stepBackButton: {
    flex: 1,
    // backgroundColor: 'transparent',
    backgroundColor: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 12,
  }
});



