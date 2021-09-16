import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

export default function PartitMin({ resultados, categoria, navigation }) {
  return (
    resultados && (
      <View style={styles.container}>
        <View style={styles.escudo}>
          <SimpleLineIcons name='shield' size={24} color='black' />
        </View>
        <View
          style={{
            flex: 0.3,
            alignItems: 'flex-end',
            justifyContent: 'center',
            textAlign: 'right',
          }}
        >
          <Text style={styles.text}>{resultados.equip1}</Text>
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
          <Text style={styles.text}>{resultados.equip2}</Text>
        </View>
        <View style={styles.escudo}>
          <SimpleLineIcons name='shield' size={24} color='black' />
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
  },
  escudo: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
  result: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
