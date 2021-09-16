import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

export default function Etiqueta({ datos, navigation }) {
  return (
    <TouchableOpacity
      style={{ padding: 5 }}
      onPress={() => {
        navigation.push('etiqueta', {
          name:
            datos === '4aCat'
              ? '4a catalana'
              : datos === '3aCat'
              ? '3a catalana'
              : datos === '2aCat'
              ? '2a catalana'
              : datos === '1aCat'
              ? '1a catalana'
              : datos,
        });
      }}
    >
      <View
        style={[
          styles.sticker,
          {
            backgroundColor:
              datos === '4a catalana'
                ? '#eb9494'
                : datos === '3a catalana'
                ? '#FF7A2F'
                : datos === '2a catalana'
                ? '#FFD953'
                : datos === '1a catalana'
                ? '#E1E1E1'
                : datos === '4aCat'
                ? '#eb9494'
                : datos === '3aCat'
                ? '#FF7A2F'
                : datos === '2aCat'
                ? '#FFD953'
                : datos === '1aCat'
                ? '#E1E1E1'
                : console.log('no existe'),
          },
        ]}
      >
        <Text style={styles.textS}>
          {datos === '4aCat'
            ? '4a catalana'
            : datos === '3aCat'
            ? '3a catalana'
            : datos === '2aCat'
            ? '2a catalana'
            : datos === '1aCat'
            ? '1a catalana'
            : datos}
        </Text>
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
