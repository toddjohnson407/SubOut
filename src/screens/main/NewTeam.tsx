import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, Dimensions, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';

import * as vars from '@base/variables'
import { BasicHeader } from '@components/BasicHeader';
import { createFormField } from '@utils/FormUtils';
import BasicTextField from '@components/BasicTextField';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BasicButton from '@components/BasicButton';

export class NewTeam extends React.Component {

  maxSteps: number = 2;

  formSteps: any[];

  state: any = {
    step: 1,
    newTeamForm: [
      createFormField('title', 'Title', { autoCapitalize: 'words' }),
      createFormField('gameDuration', 'Minutes in a Game', { keyboardType: 'number-pad' }),
      createFormField('playersOnField', 'Players on Field', { keyboardType: 'number-pad' }),
      createFormField('playersPerSub', 'Players Per Sub', { keyboardType: 'number-pad' }),
      createFormField('subFrequency', 'Sub Frequency', { keyboardType: 'number-pad' })
    ],
    playersForm: [
      createFormField('player', 'Player Name', {})
    ]
  }

  /** Updates a form field value by its index */
  handleFormUpdate(fieldIndex: number, newValue: any, firstForm: boolean = false): void {
    let formName = firstForm ? 'newTeamForm' : 'playersForm'
    if (fieldIndex === 2 && !newValue) console.log('fuck', newValue);
    this.setState((prevState: any) => {
      let formCopy = [...prevState[formName]];
      // formCopy[fieldIndex] = { ...formCopy[fieldIndex], value: newValue };
      formCopy[fieldIndex]['opts']['value'] = newValue
      return ({ [formName]: formCopy })
    });
  }

  componentDidMount() {
    console.log(this.state.step);
  }

  nextStep = (): any => {
    console.log(this.state.newTeamForm[2].opts.value);
    if (this.maxSteps > this.state.step) {
      this.addMinPlayers();
      this.setState((prevState: any) => ({ step: prevState.step + 1 }));
    }
  }
  prevStep = (): any => {
    console.log(this.state.newTeamForm[2].opts.value);
    if (this.state.step > 1) {
      this.setState((prevState: any) => ({ step: prevState.step - 1 }));
    } 
  }

  addMinPlayers = (): void => {
    let newPlayerCount = this.state.newTeamForm[2].opts.value - this.state.playersForm.length;
    // console.log('newplayercount', newPlayerCount);
    if (newPlayerCount && newPlayerCount > 0) {
      let newPlayers = [];
      for (let i = 0; i < newPlayerCount; i++) {
        newPlayers.push(createFormField('player', 'Player Name', {}));
      }

      this.setState((prevState: any) => ({
        playersForm: [...prevState.playersForm, ...newPlayers]
      }));
    }
  }

  removePlayer = (player: any): void => {
    if (this.state.playersForm.length > 1) {
      this.setState((prevState: any) => {
        let playersForm = [...prevState.playersForm];
        let playerIndex = prevState.playersForm.indexOf(player);
  
        playersForm.splice(playerIndex, 1);
        return { playersForm };
      });
    }
  }
  addPlayer = (): void => {
    this.setState((prevState: any) => {
      let playersForm = [...prevState.playersForm, createFormField('player', 'Player Name', {})];
      return { playersForm };
    });
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
                { this.state.playersForm.map((field: any, index: number) => {
                  return (
                    <View style={styles.playerField} key={index}>

                      <TouchableOpacity
                        disabled={this.state.step === 1} 
                        onPress={() => this.removePlayer(field)} 
                        style={styles.removePlayerButton}
                      >
                        <Ionicons size={48} name="ios-close" color={vars.primaryColor}/>
                      </TouchableOpacity>

                      <BasicTextField
                        key={index}
                        label={field.label}
                        containerStyle={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        autoCapitalize={field.opts.autoCapitalize}
                        keyboardType={field.opts.keyboardType}
                        secureTextEntry={field.opts.isSecure}
                        value={field.opts.value}
                        returnKeyType={field.opts.returnKeyType}
                        onChangeText={newVal => this.handleFormUpdate(index, newVal) } 
                      />
                    </View>
                  );
                }) }
              </View>
          </ScrollView>
        </KeyboardAvoidingView>

        { this.state.step === 2 ? <View style={styles.actions}>

          <BasicButton title="Add Player" style={styles.continueButton} textStyle={styles.continueButtonText} onPress={() => this.addPlayer()}/>

        </View> : null}

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
          <BasicButton title="Continue" style={styles.continueButton} textStyle={styles.continueButtonText} onPress={() => this.nextStep()}/>
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
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 16,
    height: 60,
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



