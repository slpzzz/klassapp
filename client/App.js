import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import MatchScreen from './src/screens/MatchScreen';
import UserScreen from './src/screens/UserScreen';

import FirstScreen from './src/screens/FirstScreen';
import StarterScreen from './src/screens/StarterScreen';
import Register from './src/screens/auth/Register';
import SignUp2 from './src/screens/auth/SignUp2';
import Login from './src/screens/auth/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='home' component={StarterScreen} />
        <Stack.Screen name='signup2' component={SignUp2} />
        <Stack.Screen name='register' component={Register} />
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen
          name='homeScreen'
          component={FirstScreen}
          independent={true}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
});
