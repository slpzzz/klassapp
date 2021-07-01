import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableButton,
  Text,
} from 'react-native';
import Logo from './logo';

import { MaterialIcons } from '@expo/vector-icons';

var width = Dimensions.get('screen').width;

export default function TopBar() {
  return (
    <View>
      <StatusBar barStyle='light-content' hidden={false} translucent={false} />
      <View style={styles.container}>
        <View style={styles.left}>
          <Logo size={36} color={'#1C4928'}></Logo>
        </View>
        <View style={styles.right}>
          <MaterialIcons name='notifications' size={24} color='#487551' />
          <MaterialIcons name='notifications-on' size={24} color='#1C4928' />
          <MaterialIcons name='chat-bubble-outline' size={24} color='#487551' />
          <MaterialIcons name='mark-chat-unread' size={24} color='#1C4928' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // width: '100%',
    width: width,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    flexDirection: 'row',
    //  flex: 1,
  },
  left: {
    flex: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 16,
  },
  img: {
    width: 24,
    height: 24,
  },
  right: {
    flexDirection: 'row',
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
