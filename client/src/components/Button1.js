import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Demo from './Demo';

export default function Button1({ value }) {
  return (
    <View
      style={{
        backgroundColor: '#1C4928',
        width: 216,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 4,
      }}
    >
      <Text style={{ fontSize: 15, color: 'white' }}>{value}</Text>
    </View>
  );
}
