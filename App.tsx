import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { primaryColor, bodyText, fonts, defaultNavigationOptions } from '@base/variables';
import { Ionicons, Foundation, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import { auth } from '@base/src/config';

import { LoginRegister } from '@screens/LoginRegister';
// import { Dashboard } from '@screens/main/Dashboard';
// import { NewTeam } from '@screens/main/NewTeam';
// import { Settings } from '@screens/main/Settings';
import { Dashboard, NewTeam, Settings } from '@screens/MainScreens';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ErrorBoundary } from '@components/ErrorBoundary';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ffff',
        inactiveTintColor: '#94ecfc',
        size: 30,
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

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainApp"
        headerMode="none"
      >
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default class App extends React.Component {

  state: any = { fontsLoaded: false, loggedIn: null }
  
  async componentDidMount() {
    try {
      this.setState({ loggedIn: auth.currentUser ? true : false });

      await Font.loadAsync(fonts);

      this.setState({ fontsLoaded: true });

      auth.onAuthStateChanged(user => this.setState({ loggedIn: user ? true : false }));
      
    } catch(err) { console.log(err, 'Error Mounting App'); }
  }

  render() {
    return (
      <View style={styles.container}>
        { 
          this.state.fontsLoaded && this.state.loggedIn !== null ? ( 
            this.state.loggedIn ? (<MainContainer/>) : (<LoginRegister/>)
          ) : null
        }
      </View>
    )
    if (!this.state.fontsLoaded) {
      return (
          <AppLoading onError={console.warn}/>
      )
    }
    return (
      // <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginRegister"
            // title="Sub Out"
            // screenOptions={{
            //   headerStyle: { backgroundColor: 'blue', height: 200 }
            // }}
            headerMode="none"
          >
            <Stack.Screen name="LoginRegister" component={LoginRegister} />
            <Stack.Screen name="MainApp" component={MainApp} />
          </Stack.Navigator>
        </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
