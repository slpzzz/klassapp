import React from 'react';
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
import { Ionicons } from '@expo/vector-icons';

export default function Button1() {
  const [text, setText] = React.useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <View
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
      >
        <Text>Picker</Text>
      </View>
      <View style={{ flex: 0.4 }}>
        <TextInput
          value={text}
          placeholder={'Equip'}
          style={styles.buttonText}
          onChangeText={text => setText(text)}
        />
      </View>
      <View style={{ flex: 0.2, alignItems: 'center' }}>
        <Ionicons name='add-circle' size={32} color='#1C4928' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    justifyContent: 'center',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#1C4928',
    padding: 8,
    height: 32,
    borderRadius: 5,
    color: '#1C4928',
  },
});
