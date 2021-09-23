import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';

import { View, Text, TextInput, Dimensions, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Post from '../../components/Post';
import PostSingleComponent from '../../components/PostSingleComponent';
import { getOnePost } from '../actions/posts';
import Loading from '../../components/Loading';

var height = Dimensions.get('screen').height;
var width = Dimensions.get('screen').width;

const PostSingle = navigation => {
  const isFocused = useIsFocused();
  console.log('dd', navigation);

  const [data, setData] = useState();
  useEffect(() => getOnePost(navigation.route.params, setData));
  return data ? (
    <View style={{ height: '100%' }}>
      <View
        style={{
          position: 'fixed',
          zIndex: 1,
          alignSelf: 'center',
          bottom: 10,
          padding: 10,
          backgroundColor: '#1C4928',
          width: width - 20,
          borderRadius: 50,
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: -2,
          },
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigation.push('Comment', data)}
        >
          <TextInput
            style={{
              padding: 5,
              color: 'white',
            }}
            placeholderTextColor='white'
            placeholder='Escriu un comentari'
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ zIndex: 0, height: height - 50 }}>
        <PostSingleComponent datos={data} navigation={navigation.navigation} />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  ) : (
    <Loading />
  );
};

export default PostSingle;
