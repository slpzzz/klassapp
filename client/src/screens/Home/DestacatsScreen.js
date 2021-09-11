import React, { Fragment, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import data from '../../ligas.json';
import { FollowBtn } from '../../components/FollowBtn';
import Followers from '../../components/Followers';
import { getBestPosts } from '../actions/posts';
import { Fontisto } from '@expo/vector-icons';
import {
  getProfiles,
  follow,
  unfollow,
  getProfileMe,
} from '../actions/profile';
import Post from '../../components/Post';

export default function Destacats({ navigation }) {
  const [datos, setDatos] = useState([]);
  const [handle, setHandle] = useState(false);

  useEffect(() => {
    getBestPosts(setDatos);
  }, []);

  const renderItem = ({ item }) => {
    return <Post id={item._id} datos={item} navigation={navigation} />;
  };

  return (
    <>
      <TouchableOpacity onPress={() => setHandle(!handle)}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 20,
          }}
        >
          <Fontisto name='filter' size={14} color='#764668' />
          <Text style={{ color: '#764668' }}>Filtrar</Text>
        </View>
      </TouchableOpacity>
      {handle && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Picker
            style={{
              padding: 5,
              borderColor: '#491C3D',
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 20,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Picker.Item label={'Tot'} value={'Tot'}></Picker.Item>
            {data.map((d, i) => (
              <Picker.Item
                key={i}
                label={d.label}
                value={d.value}
              ></Picker.Item>
            ))}
          </Picker>
          <Picker
            style={{
              padding: 5,
              borderColor: '#491C3D',
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 20,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Picker.Item label={'Última setmana'} value={'Última setmana'} />
            <Picker.Item label={'Últim mes'} value={'Últim mes'} />
            <Picker.Item label={'Últim any'} value={'Últim any'} />
            <Picker.Item label={'Sempre'} value={'Sempre'} />
          </Picker>
          <TouchableOpacity
            style={{ padding: 5, backgroundColor: '#491C3D', borderRadius: 20 }}
          >
            <Text style={{ color: 'white', padding: 3 }}>CERCAR</Text>
          </TouchableOpacity>
        </View>
      )}
      {datos ? (
        <FlatList
          data={datos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>Escriu per primera vegada !</Text>
      )}
    </>
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
