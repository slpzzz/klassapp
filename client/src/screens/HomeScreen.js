import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import TopBar from '../components/TopBar';
import SubTopBar from '../components/SubTopBar';

import { Seguint } from './Home/SeguintScreen';
import Destacats from './Home/DestacatsScreen';
import Descobreix from './Home/DescobreixScreen';

import WriteModal from '../components/WriteModal';

import stylesM from '../../styles';
import { getProfileMe } from './actions/profile';

const height = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  const [pressed, setPressed] = useState([true, false, false]);
  const [show, setShow] = useState(false);
  const [datos1, setDatos1] = useState();
  const [datos, setDatos] = useState();

  useEffect(() => {
    getProfileMe(setDatos1, setDatos);
  }, []);

  return (
    <View style={[stylesM.page, { height: height }]}>
      <TopBar />
      <SubTopBar pressed={pressed} setPressed={setPressed} />
      <View
        style={{
          padding: 20,
          position: 'absolute',
          alignSelf: 'flex-end',

          bottom: 0,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#1C4928',

            width: 75,
            height: 75,
            bottom: 50,
            borderRadius: 60,
            padding: 15,
          }}
          onPress={() => setShow(!show)}
        >
          <Text style={{}}>GO!</Text>
        </TouchableOpacity>
      </View>
      {pressed[0] && (
        <Seguint navigation={navigation} id_me={datos && datos._id} />
      )}
      {pressed[1] && <Destacats />}
      {pressed[2] && <Descobreix />}
      {show ? (
        <WriteModal navigation={navigation} handleShow={() => setShow(!show)} />
      ) : (
        console.log('not panas')
      )}
    </View>
  );
};

export default HomeScreen;

HomeScreen.Icon = ({ color, size }) => (
  <Entypo name='home' size={size} color={color} />
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
  },
});
