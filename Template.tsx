import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

import Profile from '@utils/db/Profile';

import BasicButton from '@components/BasicButton';
import { BasicHeader } from '@components/BasicHeader';
import { navigate } from '@base/src/RootNavigation';
import { Team } from '@utils/db/Team';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import * as vars from '@base/variables'
import DarkGradient from '@components/DarkGradient';

export class ScreenName extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false

  state: any = {

  }

  componentDidMount(): any {
    this._isMounted = true;
  }

  componentWillUnmount(): any {
    this._isMounted = false;
  }

  render(): any {
    return (
      <View style={[vars.screenView]}>
        <DarkGradient/>
      </View>
    )
  }

}

const styles = StyleSheet.create({

})

