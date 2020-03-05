import React from 'react';
import * as vars from '@base/variables';
import { View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const DarkGradient: any = () => (
  <LinearGradient
    colors={[vars.bgColor, '#204563']}
    style={{ position: 'absolute', zIndex: -1, left: 0, right: 0, bottom: 0, top: 0 }} />
);


export default DarkGradient