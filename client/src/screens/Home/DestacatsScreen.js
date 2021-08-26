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

  return (
    <View>
      {datos.map((d, i) => (
        <View key={i} style={{ flexDirection: 'row' }}>
          <Text>{d.user.name}</Text>
          <FollowBtn id={d.user._id} />
        </View>
      ))}
    </View>
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
