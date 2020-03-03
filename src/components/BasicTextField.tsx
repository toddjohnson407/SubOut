import React from 'react';
import { TextInput, Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native';

const BasicTextField = ({ label, value, onChangeText = null, secureTextEntry = false, autoCapitalize = null, returnKeyType, keyboardType }) => {

  let state: any = { text: '' };

  return (
    <View style={styles.containerStyle}>

      <TextInput
        autoCapitalize={autoCapitalize || "sentences"}
        style={styles.inputStyle}
        onChangeText={onChangeText}
        // value={value}
        secureTextEntry={secureTextEntry}
        placeholder={label}
        placeholderTextColor={'#fff'}
        autoCorrect={false}
        returnKeyType={returnKeyType || "done"}
        keyboardType={keyboardType || "default"}
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
