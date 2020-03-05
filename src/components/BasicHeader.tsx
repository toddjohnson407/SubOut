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

export const BasicHeader = ({ title, useBackButton = false, useCloseButton = false }) => {
  return (
    <View style={styles.headerStyle}>
      <View style={styles.headerActions}>
        { 
          useCloseButton ? <IconButton name="ios-close" size={40} action={() => back()}/>
          : useBackButton ? <IconButton name="ios-arrow-back" action={() => back()}/>
          : <IconButton name="ios-add-circle-outline" action={() => navigate('NewTeam', null)}/>
        }
        { !useBackButton && !useCloseButton ? <IconButton size={32} isIon={false} name="account" action={() => navigate('Settings', null)}/> : null }

      </View>
      
      <Text style={styles.headerTitleStyle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 200,
    // backgroundColor: vars.primaryColor,
    // backgroundColor: vars.bgColor,
    backgroundColor: 'transparent',
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
})
