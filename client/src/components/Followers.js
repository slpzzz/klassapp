import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { ifFollow, unfollow, follow } from '../screens/actions/profile';
import { postNoti } from '../screens/actions/notis';

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

export default function Followers({ data, navigation }) {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });
  const [handle, setHandle] = useState(false);
  const [me, setMe] = useState(false);

  useEffect(() => {
    ifFollow(setHandle, data.iduser, setMe);
  }, []);

  const setFollow = () => {
    handle
      ? unfollow(data.iduser)
      : (follow(data.iduser), postNoti(null, data.iduser, 'follow'));
    setHandle(!handle);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarParent}>
        <TouchableOpacity onPress={() => navigation.push('user', data.iduser)}>
          <Image
            style={styles.avatarProfile}
            source={{
              uri: data.avatar
                ? data.avatar
                : 'https://tds.cl/img/perfil-usuario.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.push('user', data.iduser)}>
          <Text style={styles.TextName}>{data.user}</Text>
        </TouchableOpacity>
      </View>
      {!me && (
        <TouchableOpacity onPress={() => setFollow()}>
          <View style={styles.seguirbtnP}>
            {handle ? (
              <View style={styles.siguiendobtn}>
                <Text
                  style={{ fontFamily: 'Lato_400Regular', color: '#487551' }}
                >
                  Siguiendo
                </Text>
              </View>
            ) : (
              <View style={styles.seguirbtn}>
                <Text style={{ fontFamily: 'Lato_400Regular', color: 'white' }}>
                  Seguir
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    padding: 16,
    display: 'flex',
    alignItems: 'center',
  },
  avatarProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  avatarParent: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 0.5,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  seguirbtnP: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
  seguirbtn: {
    backgroundColor: '#487551',
    borderRadius: 20,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  siguiendobtn: {
    backgroundColor: 'white',
    borderColor: '#487551',
    borderRadius: 20,
    borderWidth: 1,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 0.6,
  },
  TextName: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Lato_700Bold',
  },
  textBody: {
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
