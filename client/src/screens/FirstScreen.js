import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React, { useEffect, useState } from 'react';
import UserScreen from './UserScreen';
import HomeScreen from './HomeScreen';
import MatchScreen from './MatchScreen';

import StarterScreen from './StarterScreen';
import { Seguint } from './Home/SeguintScreen';
import Destacats from './Home/DestacatsScreen';
import Descobreix from './Home/DescobreixScreen';

import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { render } from 'react-dom';

import TopBar from '../components/TopBar';
import Posts from './UserScreens/Posts';
import Seguidors from './UserScreens/Seguidors';
import Seguintt from './UserScreens/Seguint';
import { getProfileMe } from './actions/profile';
import Header from '../components/Header';

import { EvilIcons } from '@expo/vector-icons';
import WriteModal from '../components/WriteModal';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

const myProfile = () => {
  return (
    <>
      <GetMyProfile />
      <Top.Navigator
        tabBarOptions={{
          activeTintColor: '#491C3D',
          inactiveTintColor: '#CC97BD',
          labelStyle: { fontSize: '16px', textTransform: 'capitalize' },
          style: { borderEndColor: '#491C3D' },
        }}
      >
        <Top.Screen name='Posts' component={Posts} />
        <Top.Screen name='Seguidors' component={Seguidors} />
        <Top.Screen name='Seguint' component={Seguintt} />
      </Top.Navigator>
    </>
  );
};

const GetMyProfile = () => {
  const [datos, setDatos] = useState({});
  const [datos1, setDatos1] = useState({});
  useEffect(() => {
    getProfileMe(setDatos, setDatos1);
  }, []);
  return datos && <Header datos={datos} datos1={datos1} />;
};

const TimeLine = navigation => {
  const [show, setShow] = useState(false);
  return (
    <>
      <View>
        <TopBar navigation={navigation.navigation} />
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          alignSelf: 'flex-end',
          bottom: 0,
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => setShow(!show)}>
          <View
            style={{ backgroundColor: '#1C4928', padding: 5, borderRadius: 50 }}
          >
            <EvilIcons name='pencil' size={50} color='white' />
          </View>
        </TouchableOpacity>
      </View>
      {show && (
        <View style={{ position: 'absolute', zIndex: 1 }}>
          <WriteModal handleShow={() => setShow(!show)} />
        </View>
      )}

      <Top.Navigator
        tabBarOptions={{
          activeTintColor: '#491C3D',
          inactiveTintColor: '#CC97BD',
          labelStyle: { fontSize: '16px', textTransform: 'capitalize' },
          style: { borderEndColor: '#491C3D' },
        }}
      >
        <Top.Screen name='Seguint' component={Seguint} />
        <Top.Screen name='Descobreix' component={Descobreix} />
        <Top.Screen name='Destacats' component={Destacats} />
      </Top.Navigator>
    </>
  );
};

const Screens = () => {
  return (
    <Tab.Navigator
      initialRouteName='home'
      tabBarOptions={{ showLabel: false, activeTintColor: '#1C4928' }}
    >
      <Tab.Screen
        name='match'
        component={MatchScreen}
        options={{
          tabBarIcon: MatchScreen.Icon,
        }}
      />
      <Tab.Screen
        name='home'
        component={TimeLine}
        options={{ tabBarIcon: HomeScreen.Icon }}
      />
      <Tab.Screen
        name='user'
        component={myProfile}
        options={{ tabBarIcon: UserScreen.Icon, header: false }}
      />
    </Tab.Navigator>
  );
};

const FirstScreen = () => {
  return <Screens />;
};

export default FirstScreen;
