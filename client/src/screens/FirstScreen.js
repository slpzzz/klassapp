import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import UserScreen from './UserScreen';
import HomeScreen from './HomeScreen';
import MatchScreen from './MatchScreen';

import StarterScreen from './StarterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function FirstScreen() {
  return (
    <Tab.Navigator initialRouteName='home' tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name='match'
        component={MatchScreen}
        options={{ tabBarIcon: MatchScreen.Icon }}
      />
      <Tab.Screen
        name='home'
        component={HomeScreen}
        options={{ tabBarIcon: HomeScreen.Icon }}
      />
      <Tab.Screen
        name='user'
        component={UserScreen}
        options={{ tabBarIcon: UserScreen.Icon }}
      />
    </Tab.Navigator>
  );
}
