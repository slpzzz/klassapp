import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Post from '../../components/Post';

import { getPostFollows } from '../actions/posts';
import ProgressBar from 'react-native-progress/Bar';

export const Seguint = ({ navigation }) => {
  const [datos, setDatos] = useState([]);
  const mount = useRef(null);
  useEffect(() => {
    getPostFollows(datos, setDatos);
  }, []);

  console.log(datos);
  const renderItem = ({ item }) => {
    return <Post id={item._id} datos={item} navigation={navigation} />;
  };

  console.log(datos);
  return datos ? (
    <FlatList
      data={datos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  ) : (
    <Text>Escriu per primera vegada !</Text>
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
