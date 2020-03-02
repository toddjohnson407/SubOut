import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

import * as vars from '@base/variables'
import BasicButton from '@components/BasicButton';

export class Dashboard extends React.Component {

  state: any = {}

  componentDidMount(): any {
    console.log('dashboard rendering');
  }

  render(): any {
    return (
      <View style={[vars.screenView, styles.dashboardView]}>
        {/* <Text>Dashboard Renders</Text> */}
        <View style={styles.dashboardCards}>
          <View style={styles.dashboardCard}>
            <Text style={styles.cardTitle}>No Teams</Text>
          </View>
          <BasicButton title="Create a Team" onPress={null} style={styles.newTeamButton}/>
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
    color: 'pink',
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
    // backgroundColor: '#fff',
    // backgroundColor: vars.primaryColor,
    borderRadius: 16,
    height: 100,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }

})

