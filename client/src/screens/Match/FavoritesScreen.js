import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FavLeague from '../../components/FavLeague';

export default function Favorits() {
  return (
    <View>
      <ScrollView>
        <FavLeague />
        <FavLeague />
        <FavLeague />
        <FavLeague />
      </ScrollView>
    </View>
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
