import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { primaryColor, bodyText, fonts, defaultNavigationOptions } from '@base/variables';
import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import { auth } from '@base/src/config';

import { LoginRegister } from '@screens/LoginRegister';
import { Dashboard, NewTeam, Settings, ViewTeam, ViewTeamModal, LoadingTeams, ViewRoster, ActiveGame } from '@screens/MainScreens';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';

import * as vars from '@base/variables'
import { navigationRef } from './src/RootNavigation';
import { LinearGradient } from 'expo-linear-gradient';
import { SelectTeam } from '@screens/main/SelectTeam';
import { DarkGradient } from '@components/MainComponents';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LoadingTeams" component={LoadingTeams}/>
        <Stack.Screen name="ActiveGame" component={ActiveGame}/>
        <Stack.Screen name="ViewTeam" component={ViewTeam} 
          options={{
            animationEnabled: false
          }}
        />
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="SelectTeam" component={SelectTeam}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            gestureDirection: 'vertical-inverted',
            cardStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen name="ViewRoster" component={ViewRoster}
          options={{
            mode: 'modal',
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
            gestureDirection: 'vertical',
            gestureResponseDistance: { vertical: 1000 },
            cardStyle: { backgroundColor: 'transparent' },
            // ...TransitionPresets.ModalPresentationIOS,
          }}
          />
        <Stack.Screen name="NewTeam" component={NewTeam}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }}
          />
        {/* <Stack.Screen name="Dashboard" component={Dashboard}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default class App extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false;

  state: any = { fontsLoaded: false, loggedIn: null }
  
  async componentDidMount() {
    this._isMounted = true;
    try {

      await Font.loadAsync(fonts);
      
      this.setState({ loggedIn: !!auth.currentUser, fontsLoaded: true });
      auth.onAuthStateChanged(user => this._isMounted && this.setState({ loggedIn: !!user }));

    } catch(err) { console.log(err, 'Error Mounting App'); }
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={[vars.screenView]}>
        { this.state.fontsLoaded && this.state.loggedIn !== null ? ( 
          this.state.loggedIn ? (<MainContainer/>) : (<LoginRegister/>)
        ) : null }
      </View>
    )
  }
}