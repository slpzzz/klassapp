import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

export default function Etiqueta({ datos }) {
  return (
    <TouchableOpacity style={{ padding: 5 }}>
      <View
        style={[
          styles.sticker,
          {
            backgroundColor:
              datos === '4a catalana'
                ? 'red'
                : datos === '3a catalana'
                ? '#FF7A2F'
                : datos === '2a catalana'
                ? '#FFD953'
                : datos === '1a catalana'
                ? '#E1E1E1'
                : datos === '3aDiv' && '#FF7BE2',
          },
        ]}
      >
        <Text style={styles.textS}>{datos}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sticker: {
    width: 80,
    alignItems: 'center',
    borderRadius: 20,
    padding: 2,
  },
  textS: {
    alignItems: 'center',
    fontSize: 12,
  },
});
