import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

const Comments = ({ navigation, data }) => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });
  moment.locale('ca');
  const dia = moment(data.date, 'YYYY-MM-DDThh:mm:ss').fromNow();
  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <View
          style={{
            width: 2,
            height: 10,
            backgroundColor: 'rgb(135, 135, 135)',
          }}
        />
        <View
          style={{
            width: 50,
            height: 2,
            backgroundColor: 'rgb(135, 135, 135)',
          }}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.push('user', data.user)}>
          <Image
            style={{ width: 50, height: 50, padding: 20, borderRadius: 50 }}
            source={{
              uri: data.avatar
                ? data.avatar
                : 'https://tds.cl/img/perfil-usuario.png',
            }}
          ></Image>
        </TouchableOpacity>
        <View
          style={{
            paddingLeft: 10,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: 220,
          }}
        >
          <Text style={{ fontFamily: 'Lato_900Black' }}>{data.name}</Text>

          <Text style={{ fontFamily: 'Lato_400Regular' }}>{data.text}</Text>
          <Text
            style={{
              fontFamily: 'Lato_300Light',
              color: '#565656',
            }}
          >
            {dia}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    width: 100,
  },
});
