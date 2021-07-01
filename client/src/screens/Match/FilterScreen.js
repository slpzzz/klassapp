import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Filter() {
  return (
    <View style={styles.demo}>
      <Text>Filter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  demo: {
    height: 180,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
