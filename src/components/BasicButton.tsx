import React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { primaryColor, headerFont } from '@base/variables';

const BasicButton = ({ title, onPress, style = null, textStyle = null }) => {
  console.log('ldksjfdsklf', title);
  return (
    // <LinearGradient 
    //   start={[0.0, 0.0]}
    //   colors={[primaryColor, '#5FFBF1']}
    //   style={{borderRadius: 10}}
    //   // colors={[primaryColor, '#192f6a']}
    //   // colors={['#019cbb', '#00adc2', '#00bec3', '#00cfbe', '#00deb3', '#2ce6b4', '#43edb5', '#55f5b6', '#4ff7c7', '#4ef9d7', '#54fae5', '#5ffbf1']}
    // >
      <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
      </TouchableOpacity>
    // </LinearGradient>
    // <Button 
    //   title={title}
    //   onPress={onPress}
    //   color={primaryColor} />
  );
  
}

const styles: any = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff'
  },
  textStyle: {
    backgroundColor: 'transparent',
    color: '#ffff',
    fontSize: 24,

    // letterSpacing: 2,
  }
})

export default BasicButton