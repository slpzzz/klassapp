import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  useFonts,
  Kalam_300Light,
  Kalam_400Regular,
  Kalam_700Bold,
} from '@expo-google-fonts/kalam';

export default function Logo({ size, color }) {
  let [fontsLoaded] = useFonts({
    Kalam_300Light,
    Kalam_400Regular,
    Kalam_700Bold,
  });

  return fontsLoaded ? (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: size, color: color }}>.</Text>
      <Text
        style={{
          fontFamily: 'Kalam_400Regular',
          fontSize: size,
          color: color,
        }}
      >
        k
      </Text>
    </View>
  ) : (
    <Text>.k</Text>
  );
}

const styles = StyleSheet.create({
  demo: {
    height: 180,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
