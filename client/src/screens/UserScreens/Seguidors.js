import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Followers from '../../components/Followers';
import { getProfileMe } from '../actions/profile';

const Seguidors = navigation => {
  const [datos, setDatos] = useState();
  useEffect(() => getProfileMe(setDatos), []);

  return datos ? (
    datos.followers.length > 0 ? (
      datos.followers.map(d => (
        <Followers data={d} navigation={navigation.navigation} />
      ))
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
        <Text>
          Interacciona amb els altres usuaris per aconseguir nous seguidors
        </Text>
      </View>
    )
  ) : (
    <Text>UPS! </Text>
  );
};

export default Seguidors;
