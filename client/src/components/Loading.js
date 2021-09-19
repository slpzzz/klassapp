import { View, Text, Image, ActivityIndicator } from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View
      style={{
        padding: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size='large' color='#1C4928' />
    </View>
  );
};

export default Loading;
