import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal } from 'react-native';

import Profile from '@utils/db/Profile';

import * as vars from '@base/variables'
import BasicButton from '@components/BasicButton';
import { NewTeam } from './NewTeam';
import { BasicHeader } from '@components/BasicHeader';
import { navigate } from '@base/src/RootNavigation';

export class Dashboard extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false

  state: any = {

  }

  componentDidMount(): any {
    this._isMounted = true;
    // Profile.dbProfile().then(res => console.log(res)).catch(err => console.log('Error getting profile:', err));
  }

  componentWillUnmount(): any {
    this._isMounted = false;
  }

  render(): any {
    return (
      <View style={[vars.screenView, styles.dashboardView]}>
        <BasicHeader title="Your Teams"/>
        <View style={styles.dashboardCards}>
          <View style={styles.dashboardCard}>
            <Text style={styles.cardTitle}>No Teams</Text>
          </View>
          <BasicButton title="Create a Team" onPress={() => navigate('NewTeam', null)} style={styles.newTeamButton}/>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({

  dashboardView: {
    // backgroundColor: 'black',
    // backgroundColor: vars.primaryColor
    // backgroundColor: '#D2D2D4'
    // backgroundColor: '#D5DAE2'
  },
  newTeamButton: {
    backgroundColor: vars.primaryColor,
  },

  dashboardCards: {
    marginTop: 32,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    // backgroundColor: vars.primaryColor,
    marginHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  cardTitle: {
    fontFamily: 'roboto-medium',
    fontSize: 32
  },

  dashboardCard: {
    width: '80%',
    // backgroundColor: vars.lightColor,
    backgroundColor: '#fff',
    // backgroundColor: vars.primaryColor,
    borderRadius: 16,
    height: 100,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  }

})

