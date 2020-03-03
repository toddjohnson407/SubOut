import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

import * as vars from '@base/variables'
import BasicButton from '@components/BasicButton';
import { BasicHeader } from '@components/BasicHeader';
import { auth } from '@base/src/config';

export class Settings extends React.Component {

  state: any = {}

  componentDidMount(): any {

  }

  logout(): any {
    console.log('Attempting logout');
    auth.signOut().then(_ => console.log('Logging out')).catch(err => console.log('Error logging out:', err));
  }

  render(): any {
    return (
      <View style={vars.screenView}>
        <BasicHeader title="Your Account" useBackButton={true}/>
        <View style={styles.settingsContainer}>
          <BasicButton title="Logout" onPress={() => this.logout()} style={styles.logoutButton}/>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  settingsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  logoutButton: {
    backgroundColor: vars.primaryColor
  }
})

