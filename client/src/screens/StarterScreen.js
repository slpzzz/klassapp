import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Logo from '../components/logo';
import { observer } from 'mobx-react';

import Loading from './Loading';

import { isLogged } from './actions/auth';

var height = Dimensions.get('screen').height;
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
} from '@expo-google-fonts/lato';

const StarterScreen = observer(({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
  });
  const [timePassed, setTimePassed] = useState(true);

  setTimeout(() => {
    setTimePassed(false);
    isLogged(navigation);
  }, 1000);

  return timePassed ? (
    <View>
      <Loading container={styles.container} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Logo size={72} color={'white'} />
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              fontFamily: 'Lato_400Regular',
              color: 'white',
              fontSize: 48,
            }}
          >
            lass
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <View style={styles.btn1}>
            <Text
              style={{
                fontFamily: 'Lato_400Regular',
                color: '#002100',
                fontSize: 15,
                padding: 4,
              }}
            >
              REGISTRA'T
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <View style={{ width: 278, height: 40, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Lato_400Regular', color: 'white' }}>
              INICIA SESSIÓ
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default StarterScreen;

const styles = StyleSheet.create({
  btn1: {
    backgroundColor: 'white',
    borderRadius: 60,
    width: 278,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 130,
    height: 40,
  },
  text: {
    fontSize: 32,
  },
  container: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002100',
  },
});
