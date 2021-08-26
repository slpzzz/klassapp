import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Labeltext from '../../components/Labeltext';
import LabelDate from '../../components/LabelDate';
import Button1 from '../../components/Button1';

import PropTypes from 'prop-types';

import { register } from '../actions/auth';

var height = Dimensions.get('screen').height;
var width = Dimensions.get('screen').width;

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    birth: '01818',
  });

  const { name, email, birth, password, password2 } = formData;

  const onChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const onSubmit = e => {
    if (password !== password2) {
    } else if (name && email && birth && password.length > 5) {
      register({ name, email, birth, password, navigation });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Formu}>
        <Text style={{ color: '#1C4928', fontSize: 36, marginBottom: 24 }}>
          Registra't
        </Text>
        <View style={styles.button}>
          <TextInput
            value={name}
            placeholder='Nom'
            style={styles.buttonText}
            autoCompleteType='username'
            onChange={e => onChange(e, 'name')}
          />
        </View>
        <View style={styles.button}>
          <TextInput
            value={email}
            type='email'
            placeholder='Correu electrònic'
            style={styles.buttonText}
            autoCompleteType='email'
            onChange={e => onChange(e, 'email')}
          />
        </View>
        {/*         <View style={styles.button}>
          <input
            type='date'
            placeholder='date'
            style={styles.buttonText}
            onChange={e => onChange(e, 'email')}
          />
        </View> */}
        <View style={styles.button}>
          <TextInput
            value={password}
            type='password'
            placeholder='Constrasenya'
            style={styles.buttonText}
            secureTextEntry={true}
            onChange={e => onChange(e, 'password')}
          />
        </View>
        <View style={styles.button}>
          <TextInput
            value={password2}
            type='password'
            placeholder='Constrasenya'
            style={styles.buttonText}
            secureTextEntry={true}
            onChange={e => onChange(e, 'password2')}
          />
        </View>
        <TouchableOpacity onPress={() => onSubmit()}>
          <Button1 value={'REGISTRAR-SE'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 15, color: '#1C4928' }}>
            Ja tens compte?{' '}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1C4928' }}>
            Inicia sessió
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Formu: {
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    marginBottom: 20,
    height: 30,
  },
  buttonText: {
    borderWidth: 1,
    borderColor: '#1C4928',
    borderRadius: 5,
    padding: 8,
    width: width - 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: '#1C4928',
    fontSize: 18,
    height: 40,
  },
});
