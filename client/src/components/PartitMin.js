import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

import escut from '../equips.json';

export default function PartitMin({ resultados, categoria, navigation }) {
  console.log(escut);

  const escut1 = escut.filter(d => d.nom === resultados.equip1);
  const escut2 = escut.filter(d => d.nom === resultados.equip2);

  return (
    resultados && (
      <View style={styles.container}>
        <View style={styles.escudo}>
          {escut1[0].escut ? (
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: escut1[0].escut,
              }}
            />
          ) : (
            <SimpleLineIcons name='shield' size={24} color='black' />
          )}
        </View>
        <View
          style={{
            flex: 0.3,
            alignItems: 'flex-end',
            justifyContent: 'center',
            textAlign: 'right',
          }}
        >
          <Text style={styles.text}>
            {resultados.equip1.length < 17
              ? resultados.equip1
              : resultados.equip1.substring(0, 17) + ' ...'}
          </Text>
        </View>
        <View style={styles.result}>
          <View
            style={{
              height: 43,
              width: 55,
              backgroundColor: '#797575',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 10, color: 'white' }}>
              {resultados.dia}
            </Text>
            <Text style={{ fontSize: 16, color: 'white' }}>
              {resultados.resultat ? resultados.resultat : resultados.hora}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.25,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.text}>
            {resultados.equip2.length < 17
              ? resultados.equip2
              : resultados.equip2.substring(0, 17) + ' ...'}
          </Text>
        </View>
        <View style={styles.escudo}>
          {escut2[0].escut ? (
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: escut2[0].escut,
              }}
            />
          ) : (
            <SimpleLineIcons name='shield' size={24} color='black' />
          )}
        </View>
        <View style={styles.escudo}>
          <TouchableOpacity
            onPress={() => navigation.push('write', { resultados, categoria })}
          >
            <FontAwesome name='share-square-o' size={20} color='#1C4928' />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 3,
  },
  escudo: {
    flex: 0.1,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
  result: {
    padding: 5,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
