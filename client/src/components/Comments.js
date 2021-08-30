import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Comments = ({ data }) => {
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <View style={{ width: 2, height: 10, backgroundColor: 'black' }} />
        <View style={{ width: 50, height: 2, backgroundColor: 'black' }} />
      </View>
      <View style={styles.container}>
        <View>
          <Image
            style={{ width: 50, height: 50, padding: 20, borderRadius: 50 }}
            source={{
              uri: data.avatar
                ? data.avatar
                : 'https://tds.cl/img/perfil-usuario.png',
            }}
          ></Image>
        </View>
        <View style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>{data.name}</Text>
          <Text>{data.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
});
