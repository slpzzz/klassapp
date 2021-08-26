import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Labeltext from '../../components/Labeltext';
import LabelDate from '../../components/LabelDate';
import Button1 from '../../components/Button1';
import AddRol from '../../components/AddRol';

import { Ionicons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';

import sty from '../../../styles';

import { createProfile } from '../actions/auth';

var height = Dimensions.get('screen').height;

const SignUp2 = ({ navigation }) => {
  const [rol, setRol] = useState([
    {
      title: {},
      team: {},
    },
  ]);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  const completed = () => {
    createProfile(rol, bio, location, navigation);
    //navigation.navigate('homeScreen');
  };
  const add = i => {
    setRol(oldArray => [
      ...oldArray,
      {
        title: {},
        team: {},
      },
    ]);
  };
  const remove = i => {
    if (rol.length > 1) {
      let arrayRols = [...rol];
      arrayRols.splice(2, 1);
      setRol(arrayRols);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('homeScreen')}>
        <View style={{ alignItems: 'flex-end', padding: 20 }}>
          <Entypo name='cross' size={24} color='#1C4928' />
        </View>
      </TouchableOpacity>
      <View style={styles.Formu}>
        <Text
          style={{
            color: '#1C4928',
            fontSize: 36,
            padding: 16,
            textAlign: 'center',
          }}
        >
          Ajuda’ns a completar el teu perfil
        </Text>
        <View>
          <Text>Afegeix una descripció</Text>

          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setBio(text)}
            value={bio}
            placeholder={'Descripció'}
            style={sty.buttonText}
          />
        </View>
        <View>
          <Text>Ubicación</Text>
          <TextInput
            onChangeText={text => setLocation(text)}
            value={location}
            placeholder={'Ubicació'}
            style={sty.buttonText}
          />
        </View>
        <Text style={{ fontSize: 15, color: 'black', padding: 8 }}>
          Quin és el teu rol?
        </Text>
        {rol.map((rol, index) => (
          <View>
            <AddRol
              key={index}
              removeFunction={() => remove(index)}
              rol={rol}
            />
          </View>
        ))}
        <TouchableOpacity onPress={() => add()}>
          <View style={{ flex: 0.2, alignItems: 'center' }}>
            <Ionicons name='add-circle' size={32} color='#1C4928' />
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => completed()}>
            <Button1 value={'SEGÜENT'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height,
  },
  Formu: {
    alignItems: 'center',
  },
});
