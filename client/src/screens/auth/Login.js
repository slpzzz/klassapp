import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Labeltext from '../../components/Labeltext';
import Button1 from '../../components/Button1';

import { login } from '../actions/auth.js';

var height = Dimensions.get('screen').height;
var width = Dimensions.get('screen').width;
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

const Login = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const onSubmit = e => {
    login({ email, password, navigation });
  };

  return (
    <SafeAreaView>
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
            Inicia sessió
          </Text>
          <View style={styles.button}>
            <TextInput
              value={email}
              type='email'
              placeholder='Adreça electrònica'
              style={email ? styles.buttonTextW : styles.buttonText}
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
          </View>

          <TouchableOpacity onPress={e => onSubmit(e)}>
            <Button1 value={'INICIAR SESSIÓ'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
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
              No tens compte?{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato_900Black',
                fontSize: 15,
                color: '#1C4928',
              }}
            >
              Registra't
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
