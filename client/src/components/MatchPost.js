import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

const MatchPost = ({ resultados }) => {
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
          <SimpleLineIcons name='shield' size={32} color='black' />
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
          <SimpleLineIcons name='shield' size={32} color='black' />
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
    height: 40,
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
