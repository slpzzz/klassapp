import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PartitMin from './PartitMin';

export default function FavLeague() {
  const [pressed, setPressed] = useState(false);
  const [heart, setheart] = useState(true);

  return !pressed ? (
    <TouchableOpacity onPress={e => setPressed(!pressed)}>
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 0.1 }} onPress={e => setheart(!heart)}>
          <AntDesign
            style={{ textAlign: 'center' }}
            name={heart ? 'heart' : 'hearto'}
            size={20}
            color='#487551'
          />
        </TouchableOpacity>
        <Text style={{ flex: 0.8 }}>1a catalana - subGrup 1.A</Text>
        <AntDesign
          style={{
            flex: 0.1,
            justifyContent: 'flex-end',
          }}
          name='down'
          size={24}
          color='#1C4928'
        />
      </View>
    </TouchableOpacity>
  ) : (
    <View>
      <TouchableOpacity onPress={e => setPressed(!pressed)}>
        <View style={styles.containerPress}>
          <TouchableOpacity
            style={{ flex: 0.1 }}
            onPress={e => setheart(!heart)}
          >
            <AntDesign
              style={{ textAlign: 'center' }}
              name={heart ? 'heart' : 'hearto'}
              size={20}
              color='#487551'
            />
          </TouchableOpacity>
          <Text style={{ flex: 0.8 }}>1a catalana - subGrup 1.A</Text>
          <AntDesign
            style={{
              flex: 0.1,
              justifyContent: 'flex-end',
            }}
            name='up'
            size={24}
            color='#1C4928'
          />
        </View>
      </TouchableOpacity>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', height: 50 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>JORNADA 1</Text>
      </View>
      <PartitMin />
      <PartitMin />
      <PartitMin />
      <PartitMin />
      <PartitMin />
      <View
        style={{
          padding: 16,
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 60,
            borderWidth: 1,
            borderColor: '#1C4928',
            padding: 12,
          }}
        >
          <Text style={{ color: '#1C4928' }}>VEURE EN DETALL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  containerPress: {
    padding: 8,
    backgroundColor: '#C4C4C4',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
