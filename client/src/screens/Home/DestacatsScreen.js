import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FollowBtn } from '../../components/FollowBtn';
import Followers from '../../components/Followers';

import {
  getProfiles,
  follow,
  unfollow,
  getProfileMe,
} from '../actions/profile';

export default function Destacats() {
  const [datos, setDatos] = useState([]);
  const [handle, setHandle] = useState(false);
  useEffect(() => {
    getProfiles(setDatos);
  }, []);
  console.log(datos);
  return (
    datos && (
      <View>
        {datos.map((d, i) => (
          <View>
            <Followers key={i} data={d} />
          </View>
        ))}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  demo: {
    height: 180,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
