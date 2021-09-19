import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Post from '../../components/Post';

import { getPostFollows } from '../actions/posts';
import ProgressBar from 'react-native-progress/Bar';

export const Seguint = ({ navigation }) => {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    getPostFollows(datos, setDatos);
  }, []);

  const renderItem = ({ item }) => {
    return <Post id={item._id} datos={item} navigation={navigation} />;
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
          <Text>Escriu per primera vegada</Text>
        </View>
      </TouchableOpacity>
    )
  ) : (
    <Text>Error</Text>
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
