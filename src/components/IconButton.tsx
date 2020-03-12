import React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { primaryColor, headerFont } from '@base/variables';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class IconButton extends React.Component {

  props: any;

  render(): any {
    let { onPress } = this.props;
    let style = this.props.style || null;
    return (
      <TouchableWithoutFeedback onPress={onPress} style={[{margin: 4}, style]}>
        { this.props.children }
      </TouchableWithoutFeedback>
    );
  }
}
