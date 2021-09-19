import React, { useState } from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Favorits from './Match/FavoritesScreen';
import Filter from './Match/FilterScreen';

import TopBar from '../components/TopBar';

const Top = createMaterialTopTabNavigator();

const MatchScreen = navigation => {
  return (
    <>
      <View>
        <TopBar navigation={navigation.navigation} />
      </View>
      <Top.Navigator
        tabBarOptions={{
          activeTintColor: '#491C3D',
          inactiveTintColor: '#CC97BD',
          labelStyle: { fontSize: '16px', textTransform: 'capitalize' },
          style: { borderEndColor: '#491C3D' },
        }}
      >
        <Top.Screen
          name='Favorits'
          component={Favorits}
          initialParams={{ state: false }}
        />
        <Top.Screen name='Cercar' component={Filter} />
      </Top.Navigator>
    </>
  );
};

export default MatchScreen;

MatchScreen.Icon = ({ color, size }) => (
  <FontAwesome name='soccer-ball-o' size={size} color={color} />
);
