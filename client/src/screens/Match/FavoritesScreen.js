import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FavLeague from '../../components/FavLeague';

import { getFavLeagues } from '../actions/profile';
import Loading from '../../components/Loading';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

var height = Dimensions.get('screen').height;

export default function Favorits(navigation) {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });

  const [data, setdata] = useState([]);
  useEffect(() => getFavLeagues(setdata));

  return data ? (
    <View>
      {data.length > 0 ? (
        <ScrollView style={{ height: (height * 5) / 6 }}>
          {data.map((d, i) => (
            <FavLeague key={i} data={d} navigation={navigation.navigation} />
          ))}
          <View style={{ height: 50 }} />
        </ScrollView>
      ) : (
        <View
          style={{
            padding: 40,
            flex: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'Lato_400Regular' }}>
            Agrega les teves primeres lligues
          </Text>
        </View>
      )}
    </View>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  demo: {
    height: 180,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
