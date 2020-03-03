import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import * as vars from '@base/variables';
import { navigate, back } from "../RootNavigation";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";

let IconButton = ({ name, action, size = 30, isIon = true }) => {
  return (
    <TouchableWithoutFeedback onPress={action}>
      { isIon ? <Ionicons size={size} color="white" name={name}/>
        : <MaterialCommunityIcons size={size} color="white" name={name}/>
      }
    </TouchableWithoutFeedback>
  )
}

export const BasicHeader = ({ title, useBackButton = false }) => {
  return (
    <View style={styles.headerStyle}>
      <View style={styles.headerActions}>
        { 
          useBackButton ? 
          <IconButton name="ios-arrow-back" action={() => back()}/>
          : <IconButton name="ios-add-circle-outline" action={() => navigate('NewTeam', null)}/>
        }
        {/* { !useBackButton ? <MaterialCommunityIcons size={32} color="white" name="account"/> : null } */}
        { !useBackButton ? <IconButton size={32} isIon={false} name="account" action={() => navigate('Settings', null)}/> : null }

      </View>
      
      <Text style={styles.headerTitleStyle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 200,
    backgroundColor: vars.primaryColor,
    justifyContent: 'center',
    paddingTop: 12
    // backgroundColor: 'black',

  },
  headerActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  headerTitleStyle: {

    color: '#fff',
    // color: vars.primaryColor,
    fontSize: 40,
    fontFamily: vars.headerFont,
    // textAlign: 'center',
    marginLeft: 24,
    marginTop: 24
  }




  // layout: {
  //   height: 200,
  //   backgroundColor: 'white',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   width: '100%',
  // },
  // title: {
  //   width: '90%',
  //   fontSize: 50,
  //   marginLeft: 24,
  //   // fontFamily: 'roboto-regular',
  //   // letterSpacing: 1,
  //   fontFamily: 'questrial',
  //   color: 'black'
  // },
  // bottomLayout: {
  //   width: '100%',
  //   paddingTop: 24,
  //   alignItems: 'flex-start'
  // },
  // topLayout: {
  //   // flex: 1,
  //   width: '100%',
  //   backgroundColor: 'purple',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
})
