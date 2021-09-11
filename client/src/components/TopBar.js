import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableButton,
  Text,
  TouchableOpacity,
} from 'react-native';
import Logo from './logo';

import { MaterialIcons } from '@expo/vector-icons';
import { postNoti } from '../screens/actions/notis';
import { NavigationContainer } from '@react-navigation/native';

var width = Dimensions.get('screen').width;

const TopBar = ({ navigation }) => {
  console.log('¡¡¡', navigation);
  return (
    <View>
      <StatusBar barStyle='light-content' hidden={false} translucent={false} />
      <View style={styles.container}>
        <View style={styles.left}>
          <Logo size={36} color={'#1C4928'}></Logo>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => postNoti()}>
            <MaterialIcons name='notifications' size={24} color='#487551' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notificacions')}
          >
            <MaterialIcons name='notifications-on' size={24} color='#1C4928' />
          </TouchableOpacity>
          <MaterialIcons name='chat-bubble-outline' size={24} color='#487551' />
          <MaterialIcons name='mark-chat-unread' size={24} color='#1C4928' />
        </View>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    flexDirection: 'row',
    //  flex: 1,
  },
  left: {
    marginLeft: 16,
  },
  img: {
    width: 24,
    height: 24,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});
