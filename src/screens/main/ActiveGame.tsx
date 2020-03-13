import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

import Profile from '@utils/db/Profile';

import BasicButton from '@components/BasicButton';
import { BasicHeader } from '@components/BasicHeader';
import { navigate } from '@base/src/RootNavigation';
import { Team } from '@utils/db/Team';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import * as vars from '@base/variables'
import DarkGradient from '@components/DarkGradient';
import IconButton from '@components/IconButton';

export class ActiveGame extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false

  state: any = {

  }

  props: any;

  componentDidMount(): any {
    this._isMounted = true;
    console.log('Active Game:', this.props.game);
  }

  componentWillUnmount(): any {
    this._isMounted = false;
  }

  render(): any {
    return (
      <View style={[vars.screenView]}>


        <View style={styles.clockContainer}>

          <View style={styles.clock}>
            <Text style={styles.clockText}>60:00</Text>
          </View>
          <View style={styles.toggleClock}>
            <IconButton onPress={() => null}>
              <MaterialIcons name={'pause'} color={'#fff'} size={60}/>
            </IconButton>
          </View>

        </View>

        <View style={styles.nextUp}>

        </View>
        <DarkGradient/>
      </View>
    )
  }

}

const styles = StyleSheet.create({

  clockContainer: {
    flex: 3,
    alignItems: 'center'
  },
  clock: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  clockText: {
    color: '#fff',
    fontFamily: 'roboto-bold',
    fontSize: 80
  },
  toggleClock: {

  },

  nextUp: {
    backgroundColor: vars.primaryColor,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 2,
  }

})

