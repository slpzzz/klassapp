import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import SuggestUser from '../components/SuggestUser';
import { EvilIcons } from '@expo/vector-icons';
import { getProfiles } from './actions/profile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

const height = Dimensions.get('screen').height;

const FirstFollow = navigation => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    getProfiles(setDatos);
  }, []);
  return (
    <View>
      <View style={{ alignItems: 'flex-end', padding: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigation.push('homeScreen')}
        >
          <EvilIcons name='close' size={40} color='#1C4928' />
        </TouchableOpacity>
      </View>
      <View style={{ paddingLeft: 20, paddingBottom: 20 }}>
        <Text
          style={{ fontFamily: 'Lato_700Bold', fontSize: 20, color: '#1C4928' }}
        >
          Comença a seguir als primers usuaris
        </Text>
      </View>
      <ScrollView style={{ height: (height * 2) / 3 }}>
        {datos
          .slice(0, 5)
          .sort(d => d.followers.length)
          .map((d, i) => (
            <SuggestUser key={i} data={d} navigation={navigation.navigation} />
          ))}
      </ScrollView>
    </View>
  );
};

export default FirstFollow;
