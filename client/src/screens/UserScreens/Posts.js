import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Post from '../../components/Post';
import { myPosts } from '../actions/posts';

const Posts = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => myPosts(setDatos), []);

  return datos && datos.map((d, i) => <Post key={i} datos={d} />);
};

export default Posts;
