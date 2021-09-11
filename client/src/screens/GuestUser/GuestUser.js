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
  return (
    <>
      <GuestComponent navigation={navigation} />
      <Top.Navigator>
        <Top.Screen
          name='Posts'
          component={GuestPost}
          initialParams={{ id: navigation.route.params }}
        />
        <Top.Screen
          name='Seguidors'
          component={GuestSeguidors}
          initialParams={{ id: navigation.route.params }}
        />
        <Top.Screen
          name='Seguits'
          component={GuestSeguint}
          initialParams={{ id: navigation.route.params }}
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
    console.log(navigation.route.params, datos);
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
        <TouchableOpacity onPress={() => setFollow()}>
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
              <TouchableOpacity>
                <View>
                  <Text>Editar perfil</Text>
                </View>
              </TouchableOpacity>
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
  console.log('inn');

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
  console.log('seguidors', datos.length);

  return datos ? (
    datos.length > 0 ? (
      datos.map(d => <Followers data={d} navigation={navigation.navigation} />)
    ) : (
      <View>
        <Text>
          Interacciona amb els altres usuaris per aconseguir nous seguidors!
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
  console.log('seguidors', datos.length);

  return datos ? (
    datos.length > 0 ? (
      datos.map(d => <Followers data={d} navigation={navigation.navigation} />)
    ) : (
      <View>
        <Text>
          Interacciona amb els altres usuaris per aconseguir nous seguidors!
        </Text>
      </View>
    )
  ) : (
    <Text>UPS! </Text>
  );
};

export default GuestUser;
