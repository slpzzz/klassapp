import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Logo from '../components/logo';

export default function Loading({ container }) {
  return (
    <View style={container}>
      <StatusBar barStyle='light-content' hidden={false} translucent={false} />

      <Logo size={72} color={'white'} />
    </View>
  );
}
