import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import data from '../ligas.json';

const SuggestUser = () => {
  const [handle, setHandle] = useState(false);
  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          padding: 20,
          width: 200,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: 20,
        }}
      >
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 50 }}
            source={{
              uri: 'https://tds.cl/img/perfil-usuario.png',
            }}
          />
          <Text>Name</Text>
        </View>
        <View>
          <Text>Jugador Vic</Text>
          <Text>Jugador Vic</Text>
          <Text>Jugador Vic</Text>
          <View>
            <TouchableOpacity>
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
        </View>
      </View>
    </View>
  );
};

export default SuggestUser;

const styles = StyleSheet.create({
  seguirbtnP: {
    display: 'flex',
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
