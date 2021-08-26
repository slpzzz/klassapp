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
import Destacats from './Home/DestacatsScreen';
import Descobreix from './Home/DescobreixScreen';

import { View, Text } from 'react-native';
import { render } from 'react-dom';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
};
const Home2 = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home2!</Text>
    </View>
  );
};
const NotificationsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notis!</Text>
    </View>
  );
};

const TimeLine = () => {
  return (
    <Top.Navigator>
      <Top.Screen name='Seguint' component={Seguint} />
      <Top.Screen name='Descobreix' component={Descobreix} />
      <Top.Screen name='Destacats' component={Destacats} />
    </Top.Navigator>
  );
};

const Screens = () => {
  return (
    <Tab.Navigator initialRouteName='home' tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name='match'
        component={MatchScreen}
        options={{ tabBarIcon: MatchScreen.Icon }}
      />
      <Tab.Screen
        name='home'
        component={TimeLine}
        options={{ tabBarIcon: HomeScreen.Icon }}
      />
      <Tab.Screen
        name='user'
        component={UserScreen}
        options={{ tabBarIcon: UserScreen.Icon }}
      />
    </Tab.Navigator>
  );
};

const FirstScreen = () => {
  return <Screens />;
};

export default FirstScreen;
