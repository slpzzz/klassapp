import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
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
import Loading from '../../components/Loading';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';
const Top = createMaterialTopTabNavigator();
var height = Dimensions.get('screen').height;

const GuestUser = navigation => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });

  const [datos, setDatos] = useState();

  useEffect(() => {
    getProfile(setDatos, null, navigation.route.params);
  });
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

  return datos ? (
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
              <Text style={{ fontFamily: 'Lato_400Regular', color: '#487551' }}>
                Siguiendo
              </Text>
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
              <Text style={{ fontFamily: 'Lato_400Regular', color: 'white' }}>
                Seguir
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <Loading />
  );
};

const GuestPost = navigation => {
  const [data, setData] = useState([]);

  useEffect(() => userPost(navigation.route.params.id, setData), []);

  const renderItem = ({ item }) => {
    return (
      <Post id={item._id} datos={item} navigation={navigation.navigation} />
    );
  };

  return (
    data &&
    (data.length > 0 ? (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{ height: 100 }}
      />
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
        <Text style={{ fontFamily: 'Lato_400Regular' }}>
          Aquest usuari encara no ha fet cap publicació
        </Text>
      </View>
    ))
  );
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
      <ScrollView style={{ height: 100 }}>
        {datos.map((d, i) => (
          <Followers key={i} data={d} navigation={navigation.navigation} />
        ))}
      </ScrollView>
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
        <Text style={{ fontFamily: 'Lato_400Regular' }}>
          Aquest usuari encara no té cap seguidor.
        </Text>
      </View>
    )
  ) : (
    <Loading />
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
      datos.map((d, i) => (
        <Followers key={i} data={d} navigation={navigation.navigation} />
      ))
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
        <Text style={{ fontFamily: 'Lato_400Regular' }}>
          Aquest usuari encara no segueix a ningú.
        </Text>
      </View>
    )
  ) : (
    <Loading />
  );
};

export default GuestUser;
