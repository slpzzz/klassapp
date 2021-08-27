import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Favorits from './Match/FavoritesScreen';
import Filter from './Match/FilterScreen';

import TopBar from '../components/TopBar';
import SubTopBar from '../components/SubTopBar2';

import stylesM from '../../styles';

const MatchScreen = () => {
  const [pressed, setPressed] = useState([true, false, false]);

  return (
    <View style={stylesM.page}>
      <SubTopBar pressed={pressed} setPressed={setPressed} />
      {pressed[0] && <Favorits />}
      {pressed[1] && <Filter />}
    </View>
  );
};

export default MatchScreen;

MatchScreen.Icon = ({ color, size }) => (
  <FontAwesome name='soccer-ball-o' size={size} color={color} />
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cfc',
  },
  text: {
    fontSize: 32,
  },
});
