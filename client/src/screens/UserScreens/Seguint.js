import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Followers from '../../components/Followers';
import { getProfileMe } from '../actions/profile';

const Seguint = () => {
  const [datos, setDatos] = useState();
  useEffect(() => getProfileMe(setDatos), []);

  console.log(datos);
  const updateData = () => {
    getProfileMe(setDatos);
  };

  return datos ? (
    datos.following.length > 0 ? (
      datos.following.map(d => (
        <Followers data={d} update={() => updateData()} />
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
