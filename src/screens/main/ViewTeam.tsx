import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

import * as vars from '@base/variables'
import BasicButton from '@components/BasicButton';
import { BasicHeader } from '@components/BasicHeader';
import { auth } from '@base/src/config';

export class ViewTeam extends React.Component {

  state: any = {}
  props: any;

  componentDidMount(): any {
    console.log(this.props);
    console.log('View Team Dialog');
  }

  render(): any {
    let { team } = this.props.route.params;
    return (
      <View style={styles.teamView}>
        {/* <BasicHeader title="Your Account" useBackButton={true}/> */}
        <View style={styles.teamContainer}>
          <Text style={{ fontSize: 34, color: vars.bgColor, fontFamily: vars.headerFont, marginTop: 16 }}>{team.title}</Text>
          {/* <View style={styles.buttonContainer}> */}

            <BasicButton title="New Game" onPress={() => null} style={styles.newGameButton} textStyle={{color: '#fff', fontFamily: vars.headerFont}}/>
          {/* </View> */}
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  teamView: {
    // backgroundColor: 'purple',
    flex: 1,
    justifyContent: 'flex-end'
  },
  teamContainer: {
    height: 300,
    backgroundColor: 'white',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // flex: 1
  },
  logoutButton: {
    backgroundColor: vars.primaryColor
  },
  // buttonContainer: {
  //   backgroundColor: vars.bgColor,
  //   width: '100%'
  // },
  newGameButton: {
    borderWidth: 0,
    backgroundColor: vars.bgColor,
    borderRadius: 8,
    marginBottom: 16,
    // paddingHorizontal: 46,
    width: '80%',
    ...vars.cardElevation
  }
})

