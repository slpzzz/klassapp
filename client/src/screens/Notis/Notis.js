import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getNotis, postNoti } from '../actions/notis';
import moment from 'moment';

const Notis = ({ navigation }) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    getNotis(setdata);
  }, []);
  console.log('data', data);
  moment.locale('ca');
  const dia = moment(data.date, 'YYYY-MM-DDThh:mm:ss').fromNow();
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
          {d.type === 'comment' && (
            <View
              style={{
                display: 'flex',
                textalign: 'left',
                marginLeft: 10,
              }}
            >
              <Text style={{ fontWeight: d.new ? 'bold' : 'normal' }}>
                {d.userid.name + ' ha comentat el teu post'}
              </Text>
              <View>
                <Text style={styles.textMin}>
                  {moment(d.date, 'YYYY-MM-DDThh:mm:ss').fromNow()}
                </Text>
              </View>
            </View>
          )}
          {d.type === 'like' && (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginLeft: 10,
              }}
            >
              <Text style={{ fontWeight: d.new ? 'bold' : 'normal' }}>
                {d.userid.name + ' ha donat pilota al teu post'}
              </Text>
              <View>
                <Text style={styles.textMin}>
                  {moment(d.date, 'YYYY-MM-DDThh:mm:ss').fromNow()}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('user', d.userid._id)}>
          {d.type === 'follow' && (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: 10,
              }}
            >
              <View>
                <Text style={{ fontWeight: d.new ? 'bold' : 'normal' }}>
                  {d.userid.name + " t'ha seguit"}
                </Text>
              </View>
              <View>
                <Text style={styles.textMin}>
                  {moment(d.date, 'YYYY-MM-DDThh:mm:ss').fromNow()}
                </Text>
              </View>
            </View>
          )}
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

const styles = StyleSheet.create({
  textMin: {
    fontSize: 12,
    color: 'grey',
  },
});
