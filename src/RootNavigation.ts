import * as React from 'react';
import { StackActions } from '@react-navigation/core';

export const navigationRef: any = React.createRef();

export function navigate(name, params = null) {
  console.log('nav', name);
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

export function back() {
  if (navigationRef.current) {
    // navigationRef.current.dispatch(StackActions)
    navigationRef.current.goBack();
  }
}