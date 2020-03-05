import React from 'react';
import { TextInput, Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { primaryColor } from '@base/variables';

const BasicTextField2 = ({ label, value, onSubmitEditing = null, containerStyle = null, fieldStyle = null, onChangeText = null, secureTextEntry = false, autoCapitalize = null, returnKeyType = null, keyboardType = null }) => {

  let state: any = { text: '' };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <TextInput
        autoCapitalize={autoCapitalize || "sentences"}
        style={[styles.inputStyle, fieldStyle]}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        value={value || null}
        secureTextEntry={secureTextEntry}
        placeholder={label}
        placeholderTextColor={'#ffff'}
        autoCorrect={false}
        returnKeyType={returnKeyType || "done"}
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
  
}

const styles: any = StyleSheet.create({
  inputStyle: {
    color: '#fff',
    paddingVertical: 20,
    paddingLeft: 16,
    fontSize: 18,
    lineHeight: 23,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ffff',
  },
  labelStyle: {
    fontSize: 18,
    color: '#ffff',
  },
  containerStyle: {
    borderRadius: 4,
    height: 60,
    marginVertical: 5,
    flexDirection: 'column',
    backgroundColor: '#fff3',
    width: '100%'
  }
})

export default BasicTextField2
