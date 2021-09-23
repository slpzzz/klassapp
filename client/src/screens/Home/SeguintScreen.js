import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Post from '../../components/Post';

import { getPostFollows } from '../actions/posts';
import ProgressBar from 'react-native-progress/Bar';
import { useIsFocused } from '@react-navigation/core';
import Loading from '../../components/Loading';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';
export const Seguint = navigation => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });

  const [datos, setDatos] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getPostFollows(datos, setDatos);
  }, [isFocused]);
  console.log('d', datos);

  const renderItem = ({ item }) => {
    return (
      <Post id={item._id} datos={item} navigation={navigation.navigation} />
    );
  };

  return datos ? (
    datos.length > 0 ? (
      <FlatList
        data={datos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    ) : (
      <TouchableOpacity
        style={{ height: 150 }}
        onPress={() => navigation.push('write')}
      >
        <View
          style={{
            padding: 40,
            flex: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'Lato_400Regular' }}>
            Escriu per primera vegada
          </Text>
        </View>
      </TouchableOpacity>
    )
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  demo: {
    height: 180,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
