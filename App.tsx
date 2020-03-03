import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { primaryColor, bodyText, fonts, defaultNavigationOptions } from '@base/variables';
import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import { auth } from '@base/src/config';

import { LoginRegister } from '@screens/LoginRegister';
import { Dashboard, NewTeam, Settings } from '@screens/MainScreens';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import * as vars from '@base/variables'
import { navigationRef } from './src/RootNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ffff',
        inactiveTintColor: '#94ecfc',
        size: 30,
        initialRouteName: 'Dashboard',
        showLabel: false,
        style: {
          backgroundColor: primaryColor + 'ff',
          paddingTop: 12,
        }
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <View>
                <MaterialCommunityIcons size={size} color={color} name="view-dashboard"/>
              </View>
            )
          }
        }}
      />
      <Tab.Screen name="NewTeam" component={NewTeam} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <View>
                <MaterialCommunityIcons size={size} color={color} name="target"/>
              </View>
            )
          }
        }}
      />
      <Tab.Screen name="Settings" component={Settings} 
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <View>
                <FontAwesome size={size} color={color} name="book"/>
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  );
}

function MainContainer() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="NewTeam" component={NewTeam}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }}
        />
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
      <KeyboardAvoidingView behavior="padding" style={[vars.screenView]} keyboardVerticalOffset={-50}>
        { this.state.fontsLoaded && this.state.loggedIn !== null ? ( 
          this.state.loggedIn ? (<MainContainer/>) : (<LoginRegister/>)
        ) : null }
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
