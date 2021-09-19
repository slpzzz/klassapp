import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const Comments = ({ data }) => {
  moment.locale('ca');
  const dia = moment(data.date, 'YYYY-MM-DDThh:mm:ss').fromNow();
  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <View
          style={{
            width: 2,
            height: 10,
            backgroundColor: 'rgb(135, 135, 135)',
          }}
        />
        <View
          style={{
            width: 50,
            height: 2,
            backgroundColor: 'rgb(135, 135, 135)',
          }}
        />
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
        <View
          style={{
            paddingLeft: 10,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{data.name}</Text>

          <Text>{data.text}</Text>
          <Text style={{ color: '#565656', fontSize: 10 }}>{dia}</Text>
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
