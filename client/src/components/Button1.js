import React from 'react';
import { View, Text } from 'react-native';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

export default function Button1({ value }) {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });

  return (
    <View
      style={{
        backgroundColor: '#1C4928',
        width: 216,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 4,
      }}
    >
      <Text
        style={{ fontFamily: 'Lato_400Regular', fontSize: 15, color: 'white' }}
      >
        {value}
      </Text>
    </View>
  );
}
