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
  const [rol_, setrol] = useState('jugador');

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
          flex: 0.3,
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
        <Picker.Item label='Jugador' value='jugador' />
        <Picker.Item label='Entrenador' value='entrenador' />
        <Picker.Item label='Aficionat' value='aficionat' />
      </Picker>
      <View style={{ flex: 0.4 }}>
        <TextInput
          placeholder={'Equip'}
          style={styles.buttonText}
          onChangeText={text => setText(text)}
        />
      </View>

      <TouchableOpacity onPress={removeFunction}>
        <View style={{ flex: 0.2, alignItems: 'center' }}>
          <Ionicons name='remove-circle' size={32} color='#1C4928' />
        </View>
      </TouchableOpacity>
    </View>
  );
}
