import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

import escut from '../equips.json';

const MatchPost = ({ resultados }) => {
  const escut1 = escut.filter(d => d.nom === resultados.equip1);
  const escut2 = escut.filter(d => d.nom === resultados.equip2);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flex: 0.4,
        }}
      >
        <View style={styles.escudo}>
          {escut1[0].escut ? (
            <Image
              style={{ width: 32, height: 32 }}
              source={{
                uri: escut1[0].escut,
              }}
            />
          ) : (
            <SimpleLineIcons name='shield' size={32} color='black' />
          )}
        </View>
        <Text style={styles.text}>{resultados.equip1}</Text>
      </View>
      <View style={styles.result}>
        <View
          style={{
            height: 43,
            width: 55,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Text style={{ fontSize: 10, color: 'black' }}>{resultados.dia}</Text>
          <Text style={{ fontSize: 16, color: 'black' }}>
            {resultados.resultat ? resultados.resultat : resultados.hora}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flex: 0.4,
        }}
      >
        <View style={styles.escudo}>
          {escut2[0].escut ? (
            <Image
              style={{ width: 32, height: 32 }}
              source={{
                uri: escut2[0].escut,
              }}
            />
          ) : (
            <SimpleLineIcons name='shield' size={32} color='black' />
          )}
        </View>
        <Text style={styles.text}>{resultados.equip2}</Text>
      </View>
    </View>
  );
};

export default MatchPost;

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    height: 150,
    backgroundColor: '#dedede',
    display: 'flex',
    alignItems: 'center',
  },
  escudo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 30,
  },
  text: {
    fontSize: 12,
    paddingTop: 8,
    height: 20,
  },
  result: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
