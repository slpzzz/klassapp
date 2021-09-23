import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import data from '../ligas.json';
import { postNoti } from '../screens/actions/notis';
import { follow, ifFollow, unfollow } from '../screens/actions/profile';
import { FontAwesome } from '@expo/vector-icons';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

const width = Dimensions.get('screen').width;

const SuggestUser = ({ data, navigation }) => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });
  const [handle, setHandle] = useState(false);
  const [me, setMe] = useState(false);
  const setFollow = () => {
    handle
      ? unfollow(data.user._id)
      : (follow(data.user._id), postNoti(null, data.user._id, 'follow'));
    setHandle(!handle);
  };
  useEffect(() => {
    ifFollow(setHandle, data.user._id, setMe);
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.push('user', data.user._id)}>
      <View
        style={{
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
        }}
      >
        <View
          style={{
            padding: 20,
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: 20,
          }}
        >
          <View
            style={{ flex: 0.2, justifyContent: 'center', display: 'flex' }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Image
                style={{ width: 40, height: 40, borderRadius: 50 }}
                source={{
                  uri: data.user.avatar
                    ? data.user.avatar
                    : 'https://tds.cl/img/perfil-usuario.png',
                }}
              />
            </View>
            <View style={{ padding: 5 }}>
              <Text style={{ fontFamily: 'Lato_700Bold', textAlign: 'center' }}>
                {data.user.name}
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 2,
              }}
            >
              <FontAwesome name='users' size={12} color='grey' />
              <Text
                style={{
                  fontFamily: 'Lato_300Light',
                  fontSize: 12,
                  color: 'grey',
                  marginLeft: 5,
                }}
              >
                {data.followers.length} seguidors
              </Text>
            </View>
            {data.rol.map(r => (
              <Text
                style={{
                  fontFamily: 'Lato_400Regular',
                  fontSize: 12,
                  textAlign: 'left',
                }}
              >
                {r.title} del {r.team}
              </Text>
            ))}
          </View>
          <View
            style={{
              flex: 0.3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity>
              <View style={styles.seguirbtnP}>
                {!me && (
                  <TouchableOpacity onPress={() => setFollow()}>
                    <View style={styles.seguirbtnP}>
                      {handle ? (
                        <View style={styles.siguiendobtn}>
                          <Text
                            style={{
                              fontFamily: 'Lato_400Regular',
                              color: '#487551',
                            }}
                          >
                            Siguiendo
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.seguirbtn}>
                          <Text
                            style={{
                              fontFamily: 'Lato_400Regular',
                              color: 'white',
                            }}
                          >
                            Seguir
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestUser;

const styles = StyleSheet.create({
  seguirbtnP: {
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
});
