import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getNotis, postNoti } from '../actions/notis';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/core';

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

const Notis = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });

  const [data, setdata] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getNotis(setdata);
  });

  console.log(data);
  moment.locale('ca');
  const dia = moment(data.date, 'YYYY-MM-DDThh:mm:ss').fromNow();
  return data.length > 0 ? (
    <ScrollView style={{ height: 10 }}>
      {data.map((d, i) => (
        <View
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 20,
            alignItems: 'center',
            backgroundColor: d.new ? '#b8b8b8' : '#dedede',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.push('user', d.userid._id)}
          >
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
              postNoti(null, null, null, d._id)
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
                <Text
                  style={{
                    fontFamily: 'Lato_400Regular',
                    fontWeight: d.new ? 'bold' : 'normal',
                  }}
                >
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
                  textalign: 'left',
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Lato_400Regular',
                    fontWeight: d.new ? 'bold' : 'normal',
                  }}
                >
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
          <TouchableOpacity
            onPress={() => (
              navigation.push('user', d.userid._id),
              postNoti(null, null, null, d._id)
            )}
          >
            {d.type === 'follow' && (
              <View
                style={{
                  display: 'flex',
                  textalign: 'left',
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Lato_400Regular',
                    fontWeight: d.new ? 'bold' : 'normal',
                  }}
                >
                  {d.userid.name + " t'ha seguit"}
                </Text>
                <View>
                  <Text style={styles.textMin}>
                    {moment(d.date, 'YYYY-MM-DDThh:mm:ss').fromNow()}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  ) : (
    <View style={{ display: 'flex', padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'Lato_400Regular' }}>
        Encara no has rebut cap notificació
      </Text>
    </View>
  );
};

export default Notis;

const styles = StyleSheet.create({
  textMin: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Lato_400Regular',
  },
});
