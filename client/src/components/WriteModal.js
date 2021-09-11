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
      >
        <TouchableOpacity onPress={() => handleShow()}>
          <View style={{ width: width, height: height }} />
        </TouchableOpacity>
      </View>
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
          borderRadius: 20,
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
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Enviar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }}
        >
          <View
            style={{ paddingtop: 20, display: 'flex', flexDirection: 'row' }}
          >
            {sticker.length < 3 &&
              sticker.map((p, i) => (
                <Picker
                  key={i}
                  onValueChange={a => change(a, i)}
                  style={{
                    padding: 5,
                    borderColor: '#1C4928',
                    borderWidth: 1,
                    borderRadius: 20,
                    display: 'flex',
                    flexDirection: 'row',
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
              ))}
          </View>
          <View
            style={{ paddingtop: 20, display: 'flex', flexDirection: 'row' }}
          >
            {sticker.length > 3 &&
              sticker.map((p, i) => (
                <Picker
                  key={i}
                  onValueChange={a => change(a, i)}
                  style={{
                    padding: 5,
                    borderColor: '#1C4928',
                    borderWidth: 1,
                    borderRadius: 20,
                    display: 'flex',
                    flexDirection: 'row',
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
              ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => moreStickers()}
          style={{ padding: 20 }}
        >
          <AntDesign name='pluscircleo' size={24} color='#487551' />
        </TouchableOpacity>
        <View>
          <View>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={{
                borderWidth: 1,
                borderColor: '#487551',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              onChangeText={e => setText(e)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
