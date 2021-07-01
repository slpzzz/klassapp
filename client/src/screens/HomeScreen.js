import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import TopBar from '../components/TopBar';
import SubTopBar from '../components/SubTopBar';

import Seguint from './Home/SeguintScreen';
import Destacats from './Home/DestacatsScreen';
import Descobreix from './Home/DescobreixScreen';

import stylesM from '../../styles';

const HomeScreen = () => {
  const [pressed, setPressed] = useState([true, false, false]);

  return (
    <View style={stylesM.page}>
      <TopBar />
      <SubTopBar pressed={pressed} setPressed={setPressed} />
      {pressed[0] && <Seguint />}
      {pressed[1] && <Destacats />}
      {pressed[2] && <Descobreix />}
    </View>
  );
};

export default HomeScreen;

HomeScreen.Icon = ({ color, size }) => (
  <Entypo name='home' size={size} color={color} />
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
  },
});
