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

import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

import PropTypes from 'prop-types';

import { register } from '../actions/auth';

var height = Dimensions.get('screen').height;
var width = Dimensions.get('screen').width;

const Register = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });

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
        <Text
          style={{
            fontFamily: 'Lato_400Regular',
            color: '#1C4928',
            fontSize: 36,
            marginBottom: 24,
          }}
        >
          Registra't
        </Text>
        <View style={styles.button}>
          <TextInput
            value={name}
            placeholder='Nom'
            style={name ? styles.buttonTextW : styles.buttonText}
            autoCompleteType='username'
            onChange={e => onChange(e, 'name')}
          />
        </View>
        <View style={styles.button}>
          <TextInput
            value={email}
            type='email'
            placeholder='Adreça electrònic'
            style={email ? styles.buttonTextW : styles.buttonText}
            autoCompleteType='email'
            onChange={e => onChange(e, 'email')}
          />
        </View>

        <View style={styles.button}>
          <TextInput
            value={password}
            type='password'
            placeholder='Contrasenya'
            style={password ? styles.buttonTextW : styles.buttonText}
            secureTextEntry={true}
            onChange={e => onChange(e, 'password')}
          />
          <Text style={{ fontFamily: 'Lato_400Regular', color: 'grey' }}>
            *La contrasenya ha de ser de 7 caràcters mínim
          </Text>
        </View>
        <View style={styles.button}>
          <TextInput
            value={password2}
            type='password'
            placeholder='Confirma la contrasenya'
            style={password2 ? styles.buttonTextW : styles.buttonText}
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
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              fontSize: 15,
              color: '#1C4928',
            }}
          >
            Ja tens compte?{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Lato_900Black',
              fontSize: 15,
              color: '#1C4928',
            }}
          >
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
  buttonTextW: {
    borderWidth: 2,
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
