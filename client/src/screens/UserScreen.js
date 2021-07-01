import React, { useState, setState } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';

import stylesM from '../../styles';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Header from '../components/Header';
import Post from '../components/Post';
import Followers from '../components/Followers';

var width = Dimensions.get('screen').width;

const UserScreen = observer(() => {
  const [pressed, setPressed] = useState([true, false, false]);
  const selected = index => {
    setPressed(pressed => {
      pressed = [false, false, false];
      const newList = [...pressed];

      newList[index] = !newList[index];
      return newList;
    });
  };
  return (
    <View style={{ marginBottom: 300 }}>
      <Header />
      <View elevation={5} style={styles.sectionParent}>
        <TouchableOpacity onPress={() => selected(0)}>
          <View style={styles.sections}>
            <Text>POSTS</Text>
            <Text style={styles.sectionsNum}>12</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selected(1)}>
          <View style={styles.sections}>
            <Text>SEGUIDORS</Text>
            <Text style={styles.sectionsNum}>12</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selected(2)}>
          <View style={styles.sections}>
            <Text>SEGUINT</Text>
            <Text style={styles.sectionsNum}>12</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {pressed[0] ? (
          <Post />
        ) : pressed[1] ? (
          <Followers />
        ) : pressed[2] ? (
          <Followers />
        ) : (
          <Text>Error</Text>
        )}
      </ScrollView>
    </View>
  );
});

export default UserScreen;

UserScreen.Icon = ({ color, size }) => (
  <Feather name='user' size={size} color={color} />
);

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
  },
  sections: {
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  sectionsNum: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1C4928',
  },
  sectionParent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
