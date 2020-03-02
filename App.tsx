import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { primaryColor, bodyText, fonts, defaultNavigationOptions } from '@base/variables';
import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import { auth } from '@base/src/config';

import { LoginRegister } from '@screens/LoginRegister';
import { Dashboard, NewTeam, Settings } from '@screens/MainScreens';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import * as vars from '@base/variables'

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

function MainHeader() {
  return(
    <View style={styles.headerStyle}>
      <View style={styles.headerActions}>
        <MaterialCommunityIcons size={32} color="white" name="account"/>
        <Ionicons size={30} color="white" name="ios-add-circle-outline"/>

      </View>
      <Text style={styles.headerTitleStyle}>
        Your Teams
      </Text>
    </View>
  )
}

function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={Dashboard} 
          options={{
            header: props => <MainHeader />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default class App extends React.Component {

  state: any = { fontsLoaded: false, loggedIn: null }
  
  async componentDidMount() {
    try {
      await Font.loadAsync(fonts);

      this.setState({ loggedIn: !!auth.currentUser, fontsLoaded: true });

      auth.onAuthStateChanged(user => this.setState({ loggedIn: !!user }));
    } catch(err) { console.log(err, 'Error Mounting App'); }
  }

  render() {
    return (
      this.state.fontsLoaded && this.state.loggedIn !== null ? ( 
        this.state.loggedIn ? (<MainContainer/>) : (<LoginRegister/>)
      ) : null
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerStyle: {
    height: 200,
    backgroundColor: vars.primaryColor,
    justifyContent: 'center',
    paddingTop: 12
    // backgroundColor: 'black',

  },
  headerActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  headerTitleStyle: {

    color: '#fff',
    // color: vars.primaryColor,
    fontSize: 35,
    fontFamily: 'roboto-regular',
    alignItems: 'flex-start',
    marginLeft: 24,
    marginTop: 24
  }
});
