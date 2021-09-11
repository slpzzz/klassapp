import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import Post from '../../../components/Post';
import { getStickerPosts } from '../../actions/posts';

const Etiquetes = navigation => {
  const [datos, setDatos] = useState({});
  useEffect(() => getStickerPosts(setDatos, navigation.route.params.name), []);

  const renderItem = ({ item }) => {
    return <Post datos={item} navigation={navigation.navigation} />;
  };
  return (
    <FlatList
      data={datos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default Etiquetes;
