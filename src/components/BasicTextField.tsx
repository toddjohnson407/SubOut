import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const BasicTextField = ({ label, value, onChangeText, secureTextEntry = false, autoCapitalize = null }) => {

  let state: any = { text: '' };

  return (
    <View style={styles.containerStyle}>
      <TextInput
        autoCapitalize={autoCapitalize || "sentences"}
        style={styles.inputStyle}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholder={label}
        placeholderTextColor={'#ffff'}
        autoCorrect={false}
      />
    </View>
  );
  
}

const styles: any = StyleSheet.create({
  inputStyle: {
    color: '#ffff',
    padding: 10,
    fontSize: 18,
    lineHeight: 23,
    borderBottomWidth: 1,
    borderBottomColor: '#ffff',
  },
  labelStyle: {
    fontSize: 18,
    color: '#ffff',
  },
  containerStyle: {
    height: 50,
    marginVertical: 5,
    flexDirection: 'column',
  }
})

export default BasicTextField
