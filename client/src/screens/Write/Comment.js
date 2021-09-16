import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Entypo, AntDesign } from '@expo/vector-icons';

import { addComment, addPost } from '../../screens/actions/posts';

import data from '../../ligas.json';
import { postNoti } from '../actions/notis';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Comment = navigation => {
  const [text, setText] = useState();

  const newComment = () => {
    addComment(text, navigation.route.params._id);
    setText('');
    postNoti(
      navigation.route.params._id,
      navigation.route.params.user,
      'comment'
    );
    navigation.navigation.goBack('Post', navigation.route.params._id);
  };

  return (
    <View style={{ backgroundColor: '#F5F5F6' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
            <Entypo name='cross' size={32} color='#487551' />
          </TouchableOpacity>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Text>Resposta</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: text ? '#487551' : '#728572',
            borderRadius: 50,
          }}
          onPress={newComment}
          disabled={text ? false : true}
        >
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 10,
            }}
          >
            <Text style={{ color: 'white' }}>Enviar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: width, height: 1, backgroundColor: '#487551' }} />
      <View style={{ padding: 10 }}>
        <View style={{ padding: 20, backgroundColor: '#dedede' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ width: 1, height: 1, padding: 20, borderRadius: 50 }}
              source={{
                uri: navigation.route.params.avatar
                  ? navigation.route.params.avatar
                  : 'https://tds.cl/img/perfil-usuario.png',
              }}
            />
            <Text style={{ fontWeight: 'bold', marginLeft: 5, padding: 10 }}>
              {navigation.route.params.username}
            </Text>
          </View>
          <Text style={{ padding: 10 }}>{navigation.route.params.text}</Text>
        </View>

        <View>
          <View>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Escriu el text aquí'}
              style={{
                backgroundColor: '#F5F5F6',
                padding: 20,
              }}
              onChangeText={e => setText(e)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Comment;
