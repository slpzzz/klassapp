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
import { FontAwesome } from '@expo/vector-icons';
import { getProfiles, getSuggestUsers } from '../actions/profile';
import { useIsFocused } from '@react-navigation/core';

export default function Descobreix(navigation) {
  const [datos, setDatos] = useState([]);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    getAllPosts(setDatos);
    getProfiles(setData);
  }, [isFocused]);

  const handleText = e => {
    setText(e);
  };

  const renderItem = ({ item }) => {
    return (
      <Post id={item._id} datos={item} navigation={navigation.navigation} />
    );
  };

  return (
    <>
      <View
        style={{
          padding: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 5,
        }}
      >
        <FontAwesome name='search' size={24} color='#764668' />
        <TextInput
          style={{
            width: 250,
            height: 25,
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#764668',
            marginLeft: 10,
          }}
          placeholder={'Cerca un usuari'}
          onChangeText={t => handleText(t)}
          value={text}
        />
      </View>
      {text ? (
        <ScrollView>
          {data
            .filter(f => f.user.name.includes(text))
            .map((d, i) => (
              <SuggestUser
                key={i}
                data={d}
                navigation={navigation.navigation}
              />
            ))}
        </ScrollView>
      ) : (
        <FlatList
          data={datos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          //stickyHeaderIndices={[0]}
        />
      )}
    </>
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
