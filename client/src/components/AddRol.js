import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import Demo from './Demo';
import Labeltext from './Labeltext';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../styles';

export default function AddRol({ removeFunction, rol }) {
  const [text, setText] = useState('');
  const [rol_, setrol] = useState('Jugador');

  rol.title = rol_;
  rol.team = text;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <Picker
        style={{
          flex: 0.5,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: '#1C4928',
          marginRight: 20,
          height: 32,
          justifyContent: 'center',
          padding: 8,
        }}
        selectedValue={rol_}
        onValueChange={(itemValue, itemIndex) => setrol(itemValue)}
      >
        <Picker.Item label='Jugador' value='Jugador' />
        <Picker.Item label='Entrenador' value='Entrenador' />
        <Picker.Item label='Aficionat' value='Aficionat' />
      </Picker>
      <View
        style={removeFunction !== 'principal' ? { flex: 0.3 } : { flex: 0.5 }}
      >
        <TextInput
          placeholder={'Equip'}
          style={styles1.textIn}
          onChangeText={text => setText(text)}
        />
      </View>
      {removeFunction !== 'principal' && (
        <View style={{ flex: 0.2, alignItems: 'center' }}>
          <TouchableOpacity onPress={removeFunction}>
            <Ionicons name='remove-circle' size={32} color='#1C4928' />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles1 = StyleSheet.create({
  textIn: {
    justifyContent: 'center',
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1C4928',
    padding: 8,

    borderRadius: 5,
    color: '#1C4928',
  },
});
