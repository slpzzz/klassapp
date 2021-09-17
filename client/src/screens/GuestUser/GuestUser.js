import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';

import {
  getProfile,
  ifFollow,
  follow,
  unfollow,
  getProfileMe,
} from '../actions/profile';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MatchScreen from '../MatchScreen';
import { userPost } from '../actions/posts';
import Post from '../../components/Post';
import Followers from '../../components/Followers';
import { postNoti } from '../actions/notis';

const Top = createMaterialTopTabNavigator();

const GuestUser = navigation => {
  const [datos, setDatos] = useState();

  useEffect(() => {
    getProfile(setDatos, null, navigation.route.params);
  }, []);
  console.log('pp', datos);
  return (
    <>
      <GuestComponent navigation={navigation} />
      <Top.Navigator
        tabBarOptions={{
          activeTintColor: '#491C3D',
          inactiveTintColor: '#CC97BD',
          labelStyle: { fontSize: '16px', textTransform: 'capitalize' },
          style: { borderEndColor: '#491C3D' },
        }}
      >
        <Top.Screen
          name='Posts'
          component={GuestPost}
          initialParams={{ id: navigation.route.params }}
        />
        <Top.Screen
          name='Seguidors'
          component={GuestSeguidors}
          initialParams={{ id: navigation.route.params }}
          options={
            datos
              ? {
                  // title: 'Seguidors ' + datos ? datos.following.length : '0',
                  tabBarLabel: 'SEGUIDORS\n ' + datos.followers.length,
                }
              : {
                  tabBarLabel: 'SEGUIDORS\n0',
                }
          }
        />
        <Top.Screen
          name='Seguits'
          component={GuestSeguint}
          initialParams={{ id: navigation.route.params }}
          options={
            datos
              ? {
                  // title: 'Seguidors ' + datos ? datos.following.length : '0',
                  tabBarLabel: 'SEGUINT\n' + datos.following.length,
                }
              : {
                  tabBarLabel: 'SEGUINT\n0',
                }
          }
        />
      </Top.Navigator>
    </>
  );
};

const GuestComponent = ({ navigation }) => {
  const [datos, setDatos] = useState({});
  const [datos1, setDatos1] = useState({});
  const [handle, setHandle] = useState(false);
  const [me, setMe] = useState(false);
  useEffect(() => {
    getProfile(setDatos, setDatos1, navigation.route.params);
    ifFollow(setHandle, navigation.route.params, setMe);
  }, []);

  const setFollow = () => {
    handle
      ? unfollow(navigation.route.params)
      : (follow(navigation.route.params),
        postNoti(null, navigation.route.params, 'follow'));
    setHandle(!handle);
  };

  return (
    datos && (
      <View style={{ backgroundColor: 'white' }}>
        <Header datos={datos} datos1={datos1} />
        <TouchableOpacity onPress={() => setFollow()} style={{ padding: 4 }}>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'flex-end',
              alignItems: 'center',
              display: 'flex',
              padding: 10,
            }}
          >
            {me ? (
              console.log('me')
            ) : handle ? (
              <View
                style={{
                  backgroundColor: 'white',
                  borderColor: '#487551',
                  borderRadius: 20,
                  borderWidth: 1,
                  height: 30,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#487551' }}>Siguiendo</Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#487551',
                  borderRadius: 20,
                  height: 30,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Seguir</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    )
  );
};

const GuestPost = navigation => {
  const [data, setData] = useState([]);

  useEffect(() => userPost(navigation.route.params.id, setData), []);

  return data && data.map((d, i) => <Post key={i} datos={d} />);
};

const GuestSeguidors = navigation => {
  const [datos, setDatos] = useState({});
  const [handle, setHandle] = useState(false);
  useEffect(() => {
    getProfile(null, null, navigation.route.params.id, setDatos);
    //ifFollow(setHandle, navigation.route.params);
  }, []);

  return datos ? (
    datos.length > 0 ? (
      datos.map(d => <Followers data={d} navigation={navigation.navigation} />)
    ) : (
      <View
        style={{
          padding: 40,
          flex: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Text>
          Interacciona amb els altres usuaris per aconseguir nous seguidors
        </Text>
      </View>
    )
  ) : (
    <Text>UPS! </Text>
  );
};

const GuestSeguint = navigation => {
  const [datos, setDatos] = useState({});
  const [handle, setHandle] = useState(false);
  useEffect(() => {
    getProfile(null, null, navigation.route.params.id, null, setDatos);
    //ifFollow(setHandle, navigation.route.params);
  }, []);

  return datos ? (
    datos.length > 0 ? (
      datos.map(d => <Followers data={d} navigation={navigation.navigation} />)
    ) : (
      <View
        style={{
          padding: 40,
          flex: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Text>Comença a seguir nous usuaris</Text>
      </View>
    )
  ) : (
    <Text>UPS! </Text>
  );
};

export default GuestUser;
