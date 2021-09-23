import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Post from '../../components/Post';
import { myPosts } from '../actions/posts';
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

const Posts = navigation => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });
  const isFocused = useIsFocused();

  const [datos, setDatos] = useState([]);

  useEffect(() => myPosts(setDatos), [isFocused]);
  const renderItem = ({ item }) => {
    return (
      <Post id={item._id} datos={item} navigation={navigation.navigation} />
    );
  };
  return datos.length > 0 ? (
    <FlatList
      data={datos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  ) : (
    <View
      style={{
        padding: 40,
        flex: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Text style={{ fontFamily: 'Lato_400Regular' }}>
        Encara no has fet cap post.
      </Text>
    </View>
  );
};

export default Posts;
