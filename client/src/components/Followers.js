import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FollowBtn } from './FollowBtn';

import { ifFollow, unfollow, follow } from '../screens/actions/profile';

export default function Followers({ data, update }) {
  const [handle, setHandle] = useState(false);

  useEffect(() => {
    ifFollow(setHandle, data.iduser);
  }, []);

  const setFollow = () => {
    handle ? unfollow(data.iduser) : follow(data.iduser);
    setHandle(!handle);
    update();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarParent}>
        <Image
          style={styles.avatarProfile}
          source={{
            uri: data.avatar
              ? data.avatar
              : 'https://tds.cl/img/perfil-usuario.png',
          }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.topBody}>
          <Text style={styles.TextName}>{data.iduser}</Text>
          <Text style={styles.TextName}>{handle}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setFollow()}>
        <View style={styles.seguirbtnP}>
          {handle ? (
            <View style={styles.siguiendobtn}>
              <Text style={{ color: '#487551' }}>Siguiendo</Text>
            </View>
          ) : (
            <View style={styles.seguirbtn}>
              <Text style={{ color: 'white' }}>Seguir</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    padding: 16,
  },
  avatarProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  avatarParent: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 0.7,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
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
  name: {
    flex: 0.6,
  },
  TextName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  textBody: {
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
