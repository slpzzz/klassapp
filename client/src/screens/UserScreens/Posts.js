import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Post from '../../components/Post';
import { myPosts } from '../actions/posts';

const Posts = navigation => {
  const [datos, setDatos] = useState([]);

  useEffect(() => myPosts(setDatos), []);

  return (
    datos &&
    datos.map((d, i) => (
      <Post key={i} datos={d} navigation={navigation.navigation} />
    ))
  );
};

export default Posts;
