import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, Dimensions, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';

import * as vars from '@base/variables'
import { BasicHeader } from '@components/BasicHeader';
import { createFormField } from '@utils/FormUtils';
import BasicTextField from '@components/BasicTextField';
import { Ionicons } from '@expo/vector-icons';
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
  handleFormUpdate(fieldIndex: number, newValue: any): void {
    this.setState((prevState: any) => {
      let formCopy = [...prevState['newTeamForm']];
      formCopy[fieldIndex] = { ...formCopy[fieldIndex], value: newValue };
      return ({ ['newTeamForm']: formCopy })
    });
  }

  componentDidMount() {
    console.log(this.state.step);
  }

  nextStep = (): any => {
    if (this.maxSteps > this.state.step) {
      this.addMinPlayers();
      this.setState((prevState: any) => ({ step: prevState.step + 1 }));
    } 
    console.log(this.state.step, this.maxSteps > this.state.step);
  }

  addMinPlayers = (): void => {
    let newPlayerCount = this.state.newTeamForm[2].value - this.state.playersForm.length;
    console.log('newplayercount', newPlayerCount);
    if (newPlayerCount && newPlayerCount > 0) {
      let newPlayers = [];
      for (let i = 0; i < newPlayerCount; i++) {
        newPlayers.push(createFormField('player', 'Player Name', {}));
      }

      console.log('newplayers:', newPlayers)

      this.setState((prevState: any) => ({
        playersForm: [...prevState.playersForm, ...newPlayers]
      }))
    }
  }

  render() {
    return (
      <View style={[vars.screenView, styles.newTeamView]}>
        <BasicHeader title="New Team" useBackButton={true}/>


        <KeyboardAvoidingView style={styles.teamForm} behavior="padding" keyboardVerticalOffset={-100}>
          <ScrollView>
            { this.state.step === 1 ? 
                this.state.newTeamForm.map((field: any, index: number) => {
                  return (
                    <BasicTextField
                      key={field.key}
                      label={field.label}
                      secureTextEntry={field.opts.isSecure}
                      autoCapitalize={field.opts.autoCapitalize}
                      keyboardType={field.opts.keyboardType}
                      value={field.opts.value}
                      returnKeyType={field.opts.returnKeyType}
                      onChangeText={newVal => this.handleFormUpdate(index, newVal) } 
                    />
                  );
                })
              : this.state.playersForm.map((field: any, index: number) => {
                return (
                  <BasicTextField
                    key={index}
                    label={field.label}
                    autoCapitalize={field.opts.autoCapitalize}
                    keyboardType={field.opts.keyboardType}
                    secureTextEntry={field.opts.isSecure}
                    value={field.opts.value}
                    returnKeyType={field.opts.returnKeyType}
                    onChangeText={newVal => this.handleFormUpdate(index, newVal) } 
                  />
                );
              })
            }
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.actions}>
          {/* <TouchableOpacity onPress={this.nextStep}>
            <Ionicons size={40} name="ios-arrow-dropright" color="white"/>
          </TouchableOpacity> */}
          <BasicButton title="Continue" style={styles.continueButton} onPress={() => this.nextStep()}/>
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
  actions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueButton: {
    width: '85%',
    // borderRadius: 0,
    // backgroundColor: 'white',
    // color: vars.primaryColor
  },
  newTeamHeader: {
    // flex: 0.5
  }
});



