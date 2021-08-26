import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React from 'react';
import UserScreen from './UserScreen';
import HomeScreen from './HomeScreen';
import MatchScreen from './MatchScreen';

import StarterScreen from './StarterScreen';
import { Seguint } from './Home/SeguintScreen';
import Descobreix from './Home/DescobreixScreen';
import Destacats from './Home/DestacatsScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName='home' tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name='match'
        component={Seguint}
        options={{ topBarLabel: 'Seguint' }}
      />
      <Tab.Screen
        name='home'
        component={Descobreix}
        options={{ topBarLabel: 'Descobreix' }}
      />
      <Tab.Screen
        name='user'
        component={Destacats}
        options={{ topBarLabel: 'Destacats' }}
      />
    </Tab.Navigator>
  );
};
