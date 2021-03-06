import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import * as vars from '@base/variables';
import { navigate, back } from "../RootNavigation";
import { TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";

let IconButton = ({ name, action = null, size = 30, isEntypo = true, style = null }) => {
  return (
    <TouchableWithoutFeedback onPress={action} style={style}>
      { isEntypo ? <Entypo size={size} color="white" name={name}/>
        : <MaterialCommunityIcons size={size} color="white" name={name}/>
      }
    </TouchableWithoutFeedback>
  )
}

export const TeamHeader = ({ team, allTeams }) => {
  return (
    <View style={styles.headerStyle}>
      <View style={{flex: 1}}></View>
      {/* <IconButton name="ios-add-circle-outline" action={() => navigate('NewTeam', null)} style={{ marginLeft: 12 }}/> */}
      {/* <View style={styles.titleContainer}> */}
      <TouchableOpacity style={styles.titleContainer} onPress={() => navigate('SelectTeam', {team, allTeams})}>
        {/* <TouchableOpacity onPress={() => navigate('SelectTeam', {team, allTeams})}> */}
          <Text style={styles.headerTitleStyle}>{team.title}</Text>
        {/* </TouchableOpacity> */}
        <IconButton size={12} isEntypo={true} name="chevron-thin-down" style={{ marginLeft: 12 }}/>
      </TouchableOpacity>
      {/* </View> */}
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <IconButton size={26} isEntypo={false} name="account" action={() => navigate('Settings', null)} style={{ marginRight: 24 }}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 150,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitleStyle: {
    textAlign: 'center',
    fontFamily: 'roboto-light',
    color: '#fff',
    fontSize: 24,
    flexWrap: 'wrap'
    // fontFamily: vars.headerFont,
    // marginLeft: 24,
    // marginTop: 24
  }
})
