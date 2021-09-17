import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PartitMin from './PartitMin';
import dataJSON from '../competicio.json';
import { putFavLeague, unFavLeague } from '../screens/actions/profile';

export default function FavLeague({ data, navigation }) {
  const [pressed, setPressed] = useState(false);
  const [heart, setheart] = useState(true);

  const cat = dataJSON.find(d => d.competicio === data.categoria);
  const gr = cat.grups.find(d => d.grup === data.grup);

  const toFav = () => {
    heart ? unFavLeague('2aCat', 3) : putFavLeague(cat.categoria, gr.grup);
    setheart(!heart);
  };

  return !pressed ? (
    <TouchableOpacity onPress={e => setPressed(!pressed)}>
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 0.1 }} onPress={() => toFav()}>
          <AntDesign
            style={{ textAlign: 'center' }}
            name={heart ? 'heart' : 'hearto'}
            size={20}
            color='#487551'
          />
        </TouchableOpacity>
        <Text style={{ flex: 0.8 }}>
          {data.categoria}alana - Grup {data.grup}
        </Text>
        <AntDesign
          style={{
            flex: 0.1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: 'flex',
          }}
          name='down'
          size={14}
          color='#1C4928'
        />
      </View>
    </TouchableOpacity>
  ) : (
    <View>
      <TouchableOpacity onPress={e => setPressed(!pressed)}>
        <View style={styles.containerPress}>
          <TouchableOpacity style={{ flex: 0.1 }} onPress={() => toFav()}>
            <AntDesign
              style={{ textAlign: 'center' }}
              name={heart ? 'heart' : 'hearto'}
              size={20}
              color='#487551'
            />
          </TouchableOpacity>
          <Text style={{ flex: 0.8 }}>
            {data.categoria}alana - Grup {data.grup}
          </Text>
          <AntDesign
            style={{
              flex: 0.1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              display: 'flex',
            }}
            name='up'
            size={14}
            color='#1C4928'
          />
        </View>
      </TouchableOpacity>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', height: 50 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>JORNADA 1</Text>
      </View>
      {gr.jornades.length > 0 &&
        gr.jornades[0].partits.map((d, i) => {
          return <PartitMin key={i} resultados={d} navigation={navigation} />;
        })}
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
