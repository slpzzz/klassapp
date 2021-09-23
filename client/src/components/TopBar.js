import React, { useEffect, useState } from 'react';
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
import { isNoti, postNoti } from '../screens/actions/notis';
import { NavigationContainer } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/core';

var width = Dimensions.get('screen').width;

const TopBar = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [on, setOn] = useState(false);
  useEffect(() => isNoti(setOn), [isFocused]);
  return (
    <View>
      <StatusBar barStyle='light-content' hidden={false} translucent={false} />
      <View style={styles.container}>
        <View style={styles.left}>
          <Logo size={36} color={'#1C4928'}></Logo>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notificacions')}
          >
            <MaterialIcons
              name={on ? 'notifications-on' : 'notifications'}
              size={24}
              color={on ? '#1C4928' : '#487551'}
            />
          </TouchableOpacity>
          {/*    <MaterialIcons name='chat-bubble-outline' size={24} color='#487551' />
          <MaterialIcons name='mark-chat-unread' size={24} color='#1C4928' /> */}
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
