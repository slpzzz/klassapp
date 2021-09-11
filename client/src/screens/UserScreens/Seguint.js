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
      <View>
        <Text>
          Interacciona amb els altres usuaris per aconseguir nous seguidors!
        </Text>
      </View>
    )
  ) : (
    <Text>UPS! </Text>
  );
};

export default Seguint;
