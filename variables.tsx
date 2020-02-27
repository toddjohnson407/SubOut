/* This file stores style variables and layouts that are used throughout the application */
import * as Font from 'expo-font';

const fonts: {[name: string]: Font.FontSource;} = {
  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  'ubuntu-bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
  'ubuntu-medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
  'ubuntu-regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
  'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
  'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
  'questrial': require('./assets/fonts/Questrial-Regular.ttf')
}

const primaryColor: any = '#FF6A47';
const lightColor: any = '#fc7c5f';

const bodyText: any = {
  fontSize: 20,
  fontFamily: 'questrial'
}

const screenView: any = {
  flex: 1,
  height: '100%',
  backgroundColor: '#fff'
}

const defaultNavigationOptions: any = {
  headerShown: false,
  headerMode: 'none',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'roboto-bold',
    fontSize: 20
  },
  headerStyle: {
    backgroundColor: primaryColor,
  }
}


export { 
  primaryColor,
  bodyText,
  fonts,
  screenView,
  defaultNavigationOptions,
  lightColor
}