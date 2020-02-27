import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

import * as vars from '@base/variables'

export class NewTeam extends React.Component {

  state: any = {}

  componentDidMount(): any {
    console.log('new team rendered')
  }

  render(): any {
    return (
      <View>
        <Text>NewTeam Screen Renders</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({

})

