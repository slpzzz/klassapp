import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Followers from '../../components/Followers';
import { getProfileMe } from '../actions/profile';
import Loading from '../../components/Loading';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

const Seguidors = navigation => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });
  const isFocused = useIsFocused();

  const [datos, setDatos] = useState();
  useEffect(() => getProfileMe(setDatos), [isFocused]);

  return datos ? (
    datos.followers.length > 0 ? (
      <ScrollView style={{ height: 100 }}>
        {datos.followers.map((d, i) => (
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
          Interacciona amb els altres usuaris per aconseguir nous seguidors
        </Text>
      </View>
    )
  ) : (
    <Loading />
  );
};

export default Seguidors;
