import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, Animated, PanResponder, Easing } from 'react-native';

import Profile from '@utils/db/Profile';

import BasicButton from '@components/BasicButton';
import { BasicHeader } from '@components/BasicHeader';
import { navigate } from '@base/src/RootNavigation';
import { Team } from '@utils/db/Team';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableWithoutFeedback, PanGestureHandler } from 'react-native-gesture-handler';

import SlidingUpPanel from 'rn-sliding-up-panel';

import * as vars from '@base/variables'
import DarkGradient from '@components/DarkGradient';
import IconButton from '@components/IconButton';

export class ViewRoster extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false
  _panel: any;

  props: any;
  
  componentDidMount(): any {
    this._isMounted = true;
  }

  componentWillUnmount(): any {
    this._isMounted = false;
  }

  render(): any {
    // let { players } = this.props.route.params;
    let { players } = this.props;
    return (
      <SlidingUpPanel ref={c => this._panel = c} height={500} draggableRange={{
        top: 500,
        bottom: 210
      }}>
        { dragHandler => (

          <View style={[styles.rosterContainer]}>
            <View {...dragHandler} style={{height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 8}}>
              <View style={{ backgroundColor: '#e8edf2d0', width: 50, borderRadius: 16, height: 5}}></View>
            </View>
            <Text style={{ fontSize: 26, fontFamily: 'roboto-medium', color: '#fff', marginLeft: 24, marginBottom: 8 }}>Your Players</Text>
            <View style={{flex: 1, marginHorizontal: 24, maxHeight: 300}}>
              <ScrollView>
                { players && players.length ? players.map(({name}, index: number) => (<View key={index} style={styles.player}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcons name="person" size={35} color={vars.primaryColor}/>
                    <Text style={styles.playerName}>{name}</Text>
                  </View>
                  <IconButton onPress={() => null}>
                    <MaterialIcons name="more-horiz" size={35} color={vars.primaryColor}/>
                  </IconButton>
                </View>)) : null }
              </ScrollView>
            </View>
          </View>
        )}

      </SlidingUpPanel>
    )
  }

}

const styles = StyleSheet.create({
  dragHandler: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc'
  },
  rosterContainer: {
    flex: 1,
    // backgroundColor: vars.primaryColor,
    backgroundColor: '#4f677a',
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },

  player: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  playerName: {
    fontSize: 20,
    color: vars.primaryColor,
    fontFamily: 'roboto-bold',
    marginLeft: 8
  }

})

