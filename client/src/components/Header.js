import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

var width = Dimensions.get('screen').width;

export default function Header({ datos, datos1 }) {
  return (
    <View style={styles.headerParent} elevation={5}>
      <View style={{ alignItems: 'flex-end', marginRight: 32, marginTop: 32 }}>
        <Fontisto name='player-settings' size={24} color='black' />
      </View>
      <View style={styles.header}>
        <Image
          style={styles.avatarProfile}
          source={{ uri: `${datos.avatar}` }}
        />
        <Text style={{ fontSize: 25, padding: 8 }}>{datos.name}</Text>
        <Text style={{ fontSize: 13, padding: 4 }}>{datos1.bio}</Text>
        {datos1.rol &&
          datos1.rol.map((d, i) => {
            return (
              <Text key={i} style={{ fontSize: 13, padding: 4 }}>
                {d.title} {d.team}
              </Text>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
  },
  headerParent: {
    backgroundColor: 'white',
  },
  avatarProfile: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
