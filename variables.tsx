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

  'questrial': require('./assets/fonts/Questrial-Regular.ttf'),

  'source-sans-black': require('./assets/fonts/SourceSansPro-Black.ttf'),
  'source-sans-bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
  'source-sans-semibold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
  'source-sans-regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),

  'pt-sans-regular': require('./assets/fonts/PTSans-Regular.ttf'),
  'pt-sans-bold': require('./assets/fonts/PTSans-Bold.ttf'),
  
  'muli': require('./assets/fonts/Muli-VariableFont.ttf'),
  // 'muli': require('./assets/fonts/Muli-VariableFont:wght.ttf'),

  // 'spartan': require('./assets/fonts/Spartan-VariableFont:wght.ttf'),

  'lato-black': require('./assets/fonts/Lato-Black.ttf'),
  'lato-bold': require('./assets/fonts/Lato-Regular.ttf'),
  'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
}

const primaryColor: any = '#5CD391';
// const primaryColor: any = '#FF6A47';
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