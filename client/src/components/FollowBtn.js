import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import {
  follow,
  getProfileMe,
  ifFollow,
  unfollow,
} from '../screens/actions/profile';

export const FollowBtn = ({ id }) => {
  const setFollow = () => {
    /*   handle ? unfollow(id) : follow(id);
    setHandle(!handle); */
  };

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.seguirbtnP}>
        {/*       {handle ? (
          <View style={styles.siguiendobtn}>
            <Text style={{ color: '#487551' }}>Siguiendo</Text>
          </View>
        ) : (
          <View style={styles.seguirbtn}>
            <Text style={{ color: 'white' }}>Seguir</Text>
          </View>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  seguirbtnP: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seguirbtn: {
    backgroundColor: '#487551',
    borderRadius: 20,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  siguiendobtn: {
    backgroundColor: 'white',
    borderColor: '#487551',
    borderRadius: 20,
    borderWidth: 1,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
