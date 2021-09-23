import React, { useState, setState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';

import stylesM from '../../styles';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Header from '../components/Header';
import Post from '../components/Post';
import Followers from '../components/Followers';

import { getProfileMe, getPostsMe } from './actions/profile';

var width = Dimensions.get('screen').width;

const UserScreen = observer(() => {
  const [datos, setDatos] = useState({});
  const [datos1, setDatos1] = useState({});

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getProfileMe(setDatos1, setDatos, posts);
    //getPostsMe(setPosts, datos._id);
  }, [getProfileMe]);

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
      <TouchableOpacity>
        <Text style={{}}>Tancar sessió</Text>
      </TouchableOpacity>
      {datos && <Header datos={datos} datos1={datos1} />}
      <View elevation={5} style={styles.sectionParent}>
        <TouchableOpacity onPress={() => selected(0)}>
          <View style={styles.sections}>
            <Text style={{}}>POSTS</Text>
            <Text style={styles.sectionsNum}>{posts.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selected(1)}>
          <View style={styles.sections}>
            <Text style={{}}>SEGUIDORS</Text>
            <Text style={styles.sectionsNum}>
              {datos1.followers ? datos1.followers.length : 0}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selected(2)}>
          <View style={styles.sections}>
            <Text style={{}}>SEGUINT</Text>
            <Text style={styles.sectionsNum}>
              {datos1.following ? datos1.following.length : 0}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {pressed[0] ? (
          posts &&
          posts.map((p, i) => {
            return <Post key={'post' + i} datos={p} />;
          })
        ) : pressed[1] ? (
          datos1.followers.map((d, i) => <Followers key={i} datos={d} />)
        ) : pressed[2] ? (
          datos1.following.map((d, i) => <Followers key={i} datos={d} />)
        ) : (
          <Loading />
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
