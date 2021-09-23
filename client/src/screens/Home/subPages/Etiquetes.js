import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import Post from '../../../components/Post';
import { getStickerPosts } from '../../actions/posts';
import Loading from '../../../components/Loading';
import { useIsFocused } from '@react-navigation/core';

const TimeLine = navigation => {
  const [show, setShow] = useState(false);
  return (
    <Top.Navigator
      tabBarOptions={{
        activeTintColor: '#491C3D',
        inactiveTintColor: '#CC97BD',
        labelStyle: { fontSize: '16px', textTransform: 'capitalize' },
        style: { borderEndColor: '#491C3D' },
      }}
    >
      <Top.Screen name='Seguint' component={EtiquetesComp} />
    </Top.Navigator>
  );
};
const Etiquetes = navigation => {
  const isFocused = useIsFocused();

  const [datos, setDatos] = useState({});
  useEffect(
    () => getStickerPosts(setDatos, navigation.route.params.name),
    [isFocused]
  );

  const renderItem = ({ item }) => {
    return <Post datos={item} navigation={navigation.navigation} />;
  };
  return datos ? (
    <FlatList
      data={datos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={{ height: 100 }}
    />
  ) : (
    <Loading />
  );
};

export default Etiquetes;
