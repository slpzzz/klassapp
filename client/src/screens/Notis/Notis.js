import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getNotis } from '../actions/notis';

const Notis = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    getNotis(setdata);
  }, []);
  console.log('r', data);
  return (
    data &&
    data.map(d => (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View>
          <Image
            style={{ width: 40, height: 40 }}
            source={{
              uri: d.userid.avatar
                ? `${d.userid.avatar}`
                : 'https://tds.cl/img/perfil-usuario.png',
            }}
          />
        </View>
        <View>
          <Text>{d.userid.name + ' ' + d.type}</Text>
        </View>
      </View>
    ))
  );
};

export default Notis;
