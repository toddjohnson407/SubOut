import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as vars from '@base/variables'

export class ErrorBoundary extends React.Component {

  state = { hasError: false }

  static getDerivedStateFromError (error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // logErrorToService(error, info.componentStack)
    console.log(error, info.componentStack);
    console.log(error, 'lolol');
  }

  render () {
    return (
      this.state.hasError ? (
        <View style={vars.screenView}>
          <Text style={styles.fallbackText}>Something went wrong.</Text>
        </View>
      ) : this.props.children
    );
  }
}

const styles = StyleSheet.create({
  fallbackText: {
    fontSize: 120,
    color: 'red',
    textAlign: 'center'
  }
})
