import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import { primaryColor } from '@base/variables';

export const BasicHeader = ({title}) => {
  return (
    <View style={styles.layout}>
      {/* <View style={styles.topLayout}>
        <FontAwesome size={30} name="bars" color="#ffff" style={{marginLeft: 0}}/>
        <FontAwesome size={30} name="bars" color="#ffff" style={{marginLeft: 0}}/>
      </View> */}
      <View style={styles.bottomLayout}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>    
  )
}

const styles = StyleSheet.create({
  layout: {
    height: 200,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    width: '90%',
    fontSize: 50,
    marginLeft: 24,
    // fontFamily: 'roboto-regular',
    // letterSpacing: 1,
    fontFamily: 'questrial',
    color: 'black'
  },
  bottomLayout: {
    width: '100%',
    paddingTop: 24,
    alignItems: 'flex-start'
  },
  // topLayout: {
  //   // flex: 1,
  //   width: '100%',
  //   backgroundColor: 'purple',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
})
