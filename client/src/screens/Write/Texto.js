import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Entypo, AntDesign } from '@expo/vector-icons';

import { addPost } from '../../screens/actions/posts';

import data from '../../ligas.json';
import MatchPost from '../../components/MatchPost';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Texto = navigation => {
  const [text, setText] = useState();
  const [sticker, setSticker] = useState(['1a catalana']);

  console.log(navigation);
  const send = () => {
    console.log(
      sticker === 'A tothom'
        ? ['1a catalana', '2a catalana', '3a catalana', '4a catalana']
        : 'nu',
      text
    );
    navigation.route.params
      ? addPost(sticker, text, {
          resultados: navigation.route.params.resultados,
          categoria:
            navigation.route.params.categoria === '4aCat'
              ? '4a catalana'
              : navigation.route.params.categoria === '3aCat'
              ? '3a catalana'
              : navigation.route.params.categoria === '2aCat'
              ? '2a catalana'
              : navigation.route.params.categoria === '1aCat'
              ? '1a catalana'
              : navigation.route.params.categoria === 'A tothom'
              ? ['1a catalana', '2a catalana', '3a catalana', '4a catalana']
              : navigation.route.params.categoria,
        })
      : addPost(
          sticker === 'A tothom'
            ? ['1a catalana', '2a catalana', '3a catalana', '4a catalana']
            : sticker,
          text
        );
    navigation.navigation.push('homeScreen');
    //handleShow();
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
            <Text>Escriure post</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: text ? '#487551' : '#728572',
            borderRadius: 50,
          }}
          onPress={send}
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
        {navigation.route.params ? (
          <MatchPost resultados={navigation.route.params.resultados} />
        ) : (
          <Picker
            onValueChange={a => setSticker(a)}
            style={{
              padding: 5,
              height: 40,
              borderWidth: 0,
              backgroundColor: '#E1E2E1',
            }}
          >
            {data.map((d, i) => (
              <Picker.Item
                key={i}
                label={d.label}
                value={d.value}
              ></Picker.Item>
            ))}
          </Picker>
        )}
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
  );
};

export default Texto;
