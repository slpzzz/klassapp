import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Post from '../../components/Post';
import { myPosts } from '../actions/posts';

const Posts = navigation => {
  const [datos, setDatos] = useState([]);

  useEffect(() => myPosts(setDatos), []);
  console.log('9n');
  const renderItem = ({ item }) => {
    return <Post id={item._id} datos={item} navigation={navigation} />;
  };
  return (
    datos && (
      <FlatList
        data={datos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    )
  );
};

export default Posts;
