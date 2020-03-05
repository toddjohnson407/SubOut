import React from 'react';
import { Animated, View, SafeAreaView, Text, StyleSheet, TouchableOpacity, UIManager, LayoutAnimation, Image, KeyboardAvoidingView } from 'react-native';
import BasicTextField from '@components/BasicTextField';
import BasicButton from '@components/BasicButton';
import { LinearGradient } from 'expo-linear-gradient';
import { createFormField } from '@utils/FormUtils';

import * as vars from '@base/variables'
import { Observable } from 'rxjs';

import { auth, createTimestamp, db } from '@base/src/config';

import Profile from '@utils/db/Profile';

export class LoginRegister extends React.Component {

  /** 
   * Tracks whether or not component is mounted to
   * ensure setState() isn't call while unmounted
   */
  _isMounted: boolean = false;

  state: any = {
    user: null,

    loginForm: [
      createFormField('email', 'Email', { returnKeyType: 'next', autoCapitalize: 'none' }),
      createFormField('password', 'Password', { isSecure: true })
    ],
    registerForm: [
      createFormField('confirmPassword', 'Confirm Password', { isSecure: true }),
      createFormField('username', 'Username', { autoCapitalize: 'words' }),
      createFormField('firstName', 'First Name', { autoCapitalize: 'words' }),
      createFormField('lastName', 'Last Name', { autoCapitalize: 'words' }),
    ],

    otherAccountAction1: `Don't have an account?`,
    otherAccountAction2: `Sign Up Now`,
    isLoggingIn: true
  }

  componentDidMount(): any {
    this._isMounted = true;
  }

  componentWillUnmount(): any {
    this._isMounted = false;
  }


  login = (): any => {
    if (!this.state.isLoggingIn) this.register()
    else {
      let { loginForm } = this.state;
      
      if (loginForm.every(({value}) => !!value)) {
        let [email, password] = loginForm.map(({ value }) => value);

        if (email && password) {
          auth.signInWithEmailAndPassword(email, password)
            .then(_ => { console.log('Logged In') })
            .catch(err => console.log('Error logging in', err));
        }
      }
    }
  }

  register = (): any => {

    let [email, password] = this.state.loginForm.map(({ value }) => value);
    let [confirmPassword, username, firstName, lastName] = this.state.registerForm.map(({ value }) => value);

    auth.createUserWithEmailAndPassword(email, password).then((res) => {
      let profile = new Profile(res.user.uid, firstName, lastName, username, createTimestamp());

      db.collection('profiles').doc().withConverter(Profile.profileConverter).set(profile)
        .then(_ => console.log('Profile created'))
        .catch(err => console.log('Error creating profile:', err))

    }).catch(error => this.setState({ errorMessage: error.message }))
  }

  toggleAccountAction = (): any => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    this._isMounted && this.setState((prevState: any) => ({ 
      isLoggingIn: !prevState.isLoggingIn, 
      otherAccountAction1: `${prevState.isLoggingIn ? 'Already have an account?' : "Don't have an account?"}`,
      otherAccountAction2: `${prevState.isLoggingIn ? 'Log In' : "Sign Up Now"}` 
    }));
  }

  //TODO: Implement forgot password and reset password features 
  forgotPassword(): any {}

  /** Updates a form field value by its index */
  handleFormUpdate(formName: string, fieldIndex: number, newValue: any): void {
    this.setState((prevState: any) => {
      let formCopy = [...prevState[formName]];
      formCopy[fieldIndex] = { ...formCopy[fieldIndex], value: newValue };
      return ({ [formName]: formCopy })
    });
  }


  FormsView = (): any => {
    return (
      <View style={styles.loginFormContainer}>
        { this.state.loginForm.map((field: any, index: number) => {
          return (
            <BasicTextField
            key={index}
            label={field.label}
            autoCapitalize={field.opts.autoCapitalize}
            secureTextEntry={field.opts.isSecure}
            value={field.opts.value}
            returnKeyType={field.opts.returnKeyType}
            onChangeText={newVal => this._isMounted && this.handleFormUpdate('loginForm', index, newVal) }
            />
          )
        }) }

        { !this.state.isLoggingIn && this.state.registerForm.map((field: any, index: number) => {
          return (
            <BasicTextField
              key={index}
              label={field.label}
              autoCapitalize={field.opts.autoCapitalize}
              secureTextEntry={field.opts.isSecure}
              value={field.opts.value}
              returnKeyType={field.opts.returnKeyType}
              onChangeText={newVal => this._isMounted && this.handleFormUpdate('registerForm', index, newVal) } 
            />
          )
        }) }
      </View> 
    );
  }

  _setMinHeight(event): void { this._isMounted && this.setState({ minHeight : event.nativeEvent.layout.height })}
  _setMaxHeight(event): void { this._isMounted && this.setState({ maxHeight : event.nativeEvent.layout.height })}

  render() {
    return (
      <View style={[vars.screenView, styles.loginView]}>
        { 
          this.state.isLoggingIn ? <View style={styles.loginHeaderContainer}>
            <Image
              style={styles.loginLogo}
              source={require('@assets/images/suboutwhite.png')}
            />
            <Text style={styles.loginHeader}>Sub Out</Text>
          </View> : <View style={styles.loginHeaderContainer}>
            <Text style={[styles.loginHeader, {letterSpacing: 1.5, fontFamily: 'roboto-light'}]}>Registration</Text>
          </View> 
        }

        <View>
          <this.FormsView/>

          <View style={styles.actionContainer}>
            <BasicButton style={{marginTop: 50}} title={this.state.isLoggingIn ? 'Log In' : 'Create Account'} onPress={this.login}/>
            <TouchableOpacity onPress={this.toggleAccountAction} style={styles.altOpts}>
              <Text style={styles.altOpt}>{this.state.otherAccountAction1}</Text>
              <Text style={[styles.altOpt, styles.altOpt2]}>{this.state.otherAccountAction2}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <LinearGradient
          colors={[vars.primaryColor + 'd0', '#93EAB9']}
          style={{ position: 'absolute', zIndex: -1, left: 0, right: 0, bottom: 0, height: '100%' }} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    
  },
  loginLogo: {
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  loginView: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: vars.primaryColor,
    paddingTop: 15
  },

  actionHeader: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  actionHeaderText: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'roboto-bold',
  },

  loginFormContainer: {
    width: '85%',
    alignSelf: 'center',
  },
  registerSection: { overflow: 'hidden' },

  loginHeaderContainer: {
    justifyContent: 'flex-end',
    paddingTop: 45,
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    // flex: 0.75
  },
  loginHeader: {
    marginTop: 15,
    fontFamily: 'questrial',
    color: '#fff',
    letterSpacing: 1,
    fontSize: 45,
    textAlign: 'left'
  },

  altOpts: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  altOpt: {
    color: '#ffff',
    fontSize: 16,
    fontFamily: 'roboto-regular'
  },
  altOpt2: {
    fontFamily: 'roboto-bold',
    marginLeft: 5
  },

  actionContainer: {
    alignSelf: 'center',
    // flex: 1
  }
})