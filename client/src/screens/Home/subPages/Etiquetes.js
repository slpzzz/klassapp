import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import Post from '../../../components/Post';
import { getStickerPosts } from '../../actions/posts';

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
