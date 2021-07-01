import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Picker,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Labeltext from '../../components/Labeltext';
import LabelDate from '../../components/LabelDate';
import Button1 from '../../components/Button1';
import AddRol from '../../components/AddRol';

import { Entypo } from '@expo/vector-icons';

var height = Dimensions.get('screen').height;

const SignUp2 = ({ navigation }) => {
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
        <Text style={{ fontSize: 15, color: 'black', padding: 8 }}>
          Quin és el teu rol?
        </Text>

        <AddRol />
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('homeScreen')}>
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
