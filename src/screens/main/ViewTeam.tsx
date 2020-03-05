import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

import * as vars from '@base/variables'
import BasicButton from '@components/BasicButton';
import { BasicHeader } from '@components/BasicHeader';
import { auth } from '@base/src/config';

export class ViewTeam extends React.Component {

  state: any = {}

  componentDidMount(): any {
    console.log('View Team Dialog');
  }

  render(): any {
    return (
      <View style={styles.teamView}>
        {/* <BasicHeader title="Your Account" useBackButton={true}/> */}
        <View style={styles.teamContainer}>
          <Text>TEAM VIEW</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  teamView: {
    // backgroundColor: 'purple'
    flex: 1,
    justifyContent: 'flex-end'
  },
  teamContainer: {
    height: 400,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // flex: 1
  },
  logoutButton: {
    backgroundColor: vars.primaryColor
  }
})

