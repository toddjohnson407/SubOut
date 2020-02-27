import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

import * as vars from '@base/variables'

export class Dashboard extends React.Component {

  state: any = {}

  componentDidMount(): any {
    console.log('dashboard rendering');
  }

  render(): any {
    return (
      <View style={[vars.screenView]}>
        {/* <Text>Dashboard Renders</Text> */}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  loginView: {
    width: 500,
    height: 400,
    color: 'black',
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    backgroundColor: 'pink',
    paddingTop: 15
  },
})

