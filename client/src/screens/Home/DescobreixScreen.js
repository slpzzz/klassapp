import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import { getAllPosts } from '../actions/posts';
import Post from '../../components/Post';
import SuggestUser from '../../components/SuggestUser';
import { getSuggestUsers } from '../actions/profile';

export default function Descobreix(navigation) {
  const [datos, setDatos] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllPosts(setDatos);
    getSuggestUsers();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Post id={item._id} datos={item} navigation={navigation.navigation} />
    );
  };

  const header = () => {
    return (
      <View>
        <View
          style={{
            padding: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <TextInput
            style={{
              width: 250,
              height: 25,
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#764668',
            }}
            placeholder={'Buscar'}
          />
        </View>

        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <ScrollView
            horizontal={true}
            style={{
              flexGrow: 0,
              height: 800,
            }}
          >
            <SuggestUser />
            <SuggestUser />
            <SuggestUser />
            <SuggestUser />
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={datos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => (
        <View
          style={{
            padding: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <TextInput
            style={{
              width: 250,
              height: 25,
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#764668',
            }}
            placeholder={'Cerca un usuari'}
          />
        </View>
      )}
      //stickyHeaderIndices={[0]}
    />
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
  scroll: {
    flexGrow: 0,
    height: 800,
    justifyContent: 'center',
  },
});
