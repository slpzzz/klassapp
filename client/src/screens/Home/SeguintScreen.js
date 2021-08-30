import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Post from '../../components/Post';

import { getPostFollows } from '../actions/posts';

export const Seguint = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    getPostFollows(datos, setDatos);
  }, []);

  const renderItem = ({ item }) => {
    return <Post datos={item} />;
  };

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
