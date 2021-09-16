import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getNotis, postNoti } from '../actions/notis';

const Notis = ({ navigation }) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    getNotis(setdata);
  }, []);
  return data.length > 0 ? (
    data.map(d => (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => navigation.push('user', d.userid._id)}>
          <View>
            <Image
              style={{ width: 40, height: 40, borderRadius: 50 }}
              source={{
                uri: d.userid.avatar
                  ? `${d.userid.avatar}`
                  : 'https://tds.cl/img/perfil-usuario.png',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => (
            navigation.push('Post', d.id_post),
            postNoti(null, null, null, d._id),
            getNotis(setdata)
          )}
        >
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 10,
            }}
          >
            {d.type === 'comment' && (
              <Text style={{ fontWeight: d.new ? 'bold' : 'normal' }}>
                {d.userid.name + ' ha comentat el tu post'}
              </Text>
            )}
            {d.type === 'like' && (
              <Text style={{ fontWeight: d.new ? 'bold' : 'normal' }}>
                {d.userid.name + ' ha donat pilota al teu post'}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('user', d.userid._id)}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 10,
            }}
          >
            {d.type === 'follow' && (
              <Text style={{ fontWeight: d.new ? 'bold' : 'normal' }}>
                {d.userid.name + " t'ha seguit"}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    ))
  ) : (
    <View style={{ display: 'flex', padding: 20, justifyContent: 'center' }}>
      <Text>Encara no has rebut cap notificació</Text>
    </View>
  );
};

export default Notis;
