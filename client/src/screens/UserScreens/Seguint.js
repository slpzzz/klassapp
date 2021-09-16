import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Followers from '../../components/Followers';
import { getProfileMe } from '../actions/profile';

const Seguint = navigation => {
  const [datos, setDatos] = useState();
  useEffect(() => getProfileMe(setDatos), []);

  return datos ? (
    datos.following.length > 0 ? (
      datos.following.map(d => (
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
        <Text>Comença a seguir nous usuaris</Text>
      </View>
    )
  ) : (
    <Text>UPS! </Text>
  );
};

export default Seguint;
