import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Labeltext from '../../components/Labeltext';
import LabelDate from '../../components/LabelDate';
import Button1 from '../../components/Button1';
import AddRol from '../../components/AddRol';

import { Ionicons } from '@expo/vector-icons';

import { EvilIcons } from '@expo/vector-icons';
import sty from '../../../styles';

import { createProfile } from '../actions/auth';

var height = Dimensions.get('screen').height;
var width = Dimensions.get('screen').width;

const SignUp2 = ({ navigation }) => {
  const [rol, setRol] = useState([{ title: '', team: '' }]);
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
  const remove = (i, rol_) => {
    if (rol.length > 0) {
      let arrayRols = [...rol];
      arrayRols.splice(1, 1);
      setRol(arrayRols);
      console.log('remove', i, arrayRols, parseInt(i + 1), rol_);
    }
    console.log('remove', i, rol, parseInt(i + 1), rol_);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('followFirst')}
      ></TouchableOpacity>
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
      <View style={styles.Formu}>
        {/*  <View style={styles.pad}>
          <Text style={styles.text}>Afegeix una descripció</Text>

          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setBio(text)}
            value={bio}
            placeholder={'Descripció'}
            style={sty.buttonText}
          />
        </View> */}
        <View style={styles.pad}>
          <Text style={styles.text}>Ubicación</Text>
          <TextInput
            onChangeText={text => setLocation(text)}
            value={location}
            placeholder={'Ubicació'}
            style={sty.buttonText}
          />
        </View>
        <View style={styles.pad}>
          <Text style={styles.text}>Quin és el teu rol?</Text>
          <ScrollView>
            {rol.map((r, index) =>
              index === 0 ? (
                <View style={{ backgroundColor: '#E2F1EA', borderRadius: 10 }}>
                  <AddRol removeFunction={'principal'} rol={r} />
                </View>
              ) : (
                <View>
                  <AddRol
                    key={index}
                    removeFunction={() => remove(index, r)}
                    rol={r}
                  />
                </View>
              )
            )}
          </ScrollView>

          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <TouchableOpacity onPress={() => add()}>
              <Ionicons name='add-circle' size={32} color='#1C4928' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          width: width,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
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
    padding: 20,
  },
  pad: {
    paddingTop: 10,
  },
  text: {
    fontSize: 15,
    color: 'black',
    padding: 8,
  },
});
