import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

var width = Dimensions.get('screen').width;

export default function Header({ datos, datos1 }) {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });
  return (
    <View style={styles.headerParent} elevation={5}>
      {/*       <View style={{ alignItems: 'flex-end', marginRight: 32, marginTop: 32 }}>
        <Fontisto name='player-settings' size={24} color='black' />
      </View> */}
      <View style={styles.header}>
        <Image
          style={styles.avatarProfile}
          source={{
            uri: datos1.avatar
              ? datos1.avatar
              : 'https://tds.cl/img/perfil-usuario.png',
          }}
        />
        <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 25, padding: 8 }}>
          {datos1.name}
        </Text>
        {location && (
          <View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
            <Image
              style={{ width: 20, height: 20, padding: 10 }}
              source={{
                uri: 'https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-location-pin-essentials-prettycons-lineal-color-prettycons-4.png',
              }}
            />
            <Text
              style={{
                fontFamily: 'Lato_400Regular',
                fontSize: 13,
                color: '#4E4E4E',
                padding: 4,
              }}
            >
              {datos.location}
            </Text>
          </View>
        )}
        {/* <Text style={{ fontSize: 13, padding: 4 }}>{datos.bio}</Text> */}
        {datos.rol &&
          datos.rol.map((d, i) => {
            return (
              <Text
                key={i}
                style={{
                  fontSize: 16,
                  padding: 4,
                  fontWeight: i === 0 ? 'bold' : 'normal',
                  color: '#487551',
                }}
              >
                {d.title} del {d.team}
              </Text>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
  },
  headerParent: {
    backgroundColor: 'white',
  },
  avatarProfile: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
