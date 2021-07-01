import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

export default function Etiqueta() {
  return (
    <TouchableOpacity>
      <View style={styles.sticker}>
        <Text style={styles.textS}>3a catalana</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sticker: {
    width: 100,
    backgroundColor: 'orange',
    borderRadius: 20,
  },
  textS: {
    alignItems: 'center',
    fontSize: 12,
  },
});
