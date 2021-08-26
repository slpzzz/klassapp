import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Entypo, AntDesign } from '@expo/vector-icons';

import data from '../ligas.json';

import { addPost } from '../screens/actions/posts';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default function WriteModal({ handleShow, navigation }) {
  const [sticker, setsticker] = useState(['1a catalana']);
  const [ll, setLL] = useState('1a catalana');
  const [text, setText] = useState();

  const moreStickers = () => {
    setsticker(a => [...a, ll]);
  };
  const send = () => {
    addPost(sticker, text);
    handleShow();
    navigation.navigate('homeScreen');
  };

  const change = (e, i) => {
    setLL(e);
    sticker.splice(i, 1, e);
    //pick[i] ? pick.splice(i, 0, e) : setPick(a => [...a, ll]);
  };
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: width,
        height: height,
      }}
    >
      <View
        style={{
          backgroundColor: 'black',
          opacity: 0.5,
          width: width,
          height: height,
          zIndex: 0,
          position: 'absolute',
        }}
      ></View>
      <View
        style={{
          backgroundColor: 'white',
          zIndex: 1,
          justifyContent: 'center',
          width: width - 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          padding: 16,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity onPress={handleShow}>
            <Entypo name='cross' size={24} color='#487551' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#487551',
              borderRadius: 20,
            }}
            onPress={send}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', width: 60 }}>Enviar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ padding: 20 }}>
            {sticker.length < 5 &&
              sticker.map((p, i) => (
                <Picker
                  key={i}
                  onValueChange={a => change(a, i)}
                  style={{ flex: 0.5, padding: 5 }}
                >
                  {data.map((d, i) => (
                    <Picker.Item
                      key={i}
                      label={d.label}
                      value={d.value}
                    ></Picker.Item>
                  ))}
                </Picker>
              ))}
          </View>
          <TouchableOpacity
            onPress={() => moreStickers()}
            style={{ padding: 20 }}
          >
            {sticker.length < 4 && (
              <AntDesign name='pluscircleo' size={24} color='#487551' />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={{ borderWidth: 1, borderColor: '#487551' }}
              onChangeText={e => setText(e)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
