import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Followers from '../../components/Followers';
import { getProfileMe } from '../actions/profile';
import Loading from '../../components/Loading';

const Seguint = navigation => {
  const isFocused = useIsFocused();

  const [datos, setDatos] = useState();
  useEffect(() => getProfileMe(setDatos));

  return datos ? (
    datos.following.length > 0 ? (
      <ScrollView style={{ height: 100 }}>
        {datos.following.map((d, i) => (
          <Followers key={i} data={d} navigation={navigation.navigation} />
        ))}
      </ScrollView>
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
        <Text style={{}}>Comença a seguir nous usuaris</Text>
      </View>
    )
  ) : (
    <Loading />
  );
};

export default Seguint;
