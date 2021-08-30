import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Etiqueta from './Etiqueta';
import { FontAwesome } from '@expo/vector-icons';
import {
  likePost,
  unlikePost,
  isLike,
  addComment,
} from '../screens/actions/posts';
import { getProfileMe } from '../screens/actions/profile';
import Comments from './Comments';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import sty from '../../styles';

export default function Post({ datos }) {
  const [like, setLike] = useState(false);
  const [numLikes, setNumLikes] = useState();
  const [comment, setComment] = useState();
  const [open, setOpen] = useState(false);
  const [openWritter, setOpenWritter] = useState(false);

  useEffect(() => {
    isLike(setLike, datos._id);
    datos.likes && setNumLikes(datos.likes.length);
  }, []);
  const newComment = () => {
    addComment(comment, datos._id);
    setComment('');
  };

  return datos ? (
    <View>
      <View style={styles.container}>
        <View style={styles.avatarParent}>
          <View style={styles.avatar}>
            <Image
              style={styles.avatarProfile}
              source={{
                uri: datos.avatar
                  ? `${datos.avatar}`
                  : 'https://tds.cl/img/perfil-usuario.png',
              }}
            />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.topBody}>
            <View style={styles.name}>
              <Text style={styles.TextName}>{datos.username}</Text>
            </View>
            <View style={styles.time}></View>
            <Text style={styles.TextTime}>21:32</Text>
          </View>
          {datos.rol.length > 0 && (
            <Text style={styles.TextTitleRol}>
              {datos.rol[0].title} {datos.rol[0].team}
            </Text>
          )}
          <View>
            <Text style={styles.textBody}>
              {datos.text} {like ? 'true' : 'false'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 3 }}>
            <ScrollView horizontal={true}>
              {datos.sticker && datos.sticker.map(d => <Etiqueta datos={d} />)}
            </ScrollView>
          </View>
          <View style={styles.interactBtnParent}>
            <View style={styles.interactBtn}>
              <TouchableOpacity
                onPress={() => {
                  setOpen(!open), setOpenWritter(true);
                }}
              >
                <FontAwesome name='comment-o' size={13} color='black' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (setOpen(!open), setOpenWritter(false))}
              >
                <Text style={{ marginLeft: 8 }}>
                  {datos.comments ? datos.comments.length : 0}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.interactBtn}>
              <TouchableOpacity
                onPress={() =>
                  like
                    ? (unlikePost(datos._id, setLike),
                      setNumLikes(numLikes - 1))
                    : (likePost(datos._id, setLike), setNumLikes(numLikes + 1))
                }
              >
                <FontAwesome
                  name='soccer-ball-o'
                  size={13}
                  color={like ? '#1C4928' : 'black'}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 8 }}>
                {datos.likes ? numLikes : 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          display: open ? 'block' : 'none',
          backgroundColor: '#dedede',
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => setOpenWritter(!openWritter)}>
          <View
            style={{
              display: openWritter ? 'none' : 'flex',
              flexDirection: 'row',
            }}
          >
            <MaterialCommunityIcons
              name='pencil-circle-outline'
              size={24}
              color='black'
            />
            <Text>Escriu un comentari</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: openWritter ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <TextInput
            multiline={true}
            numberOfLines={2}
            onChangeText={text => setComment(text)}
            value={comment}
            placeholder={'Escribe un comentario'}
            style={styles.textInput}
          />
          <MaterialCommunityIcons
            name='send-circle'
            size={24}
            color='#002100'
            onPress={() => newComment()}
            styles={{ width: '30%' }}
          />
        </View>
        <ScrollView style={{ height: 200 }}>
          {datos.comments &&
            datos.comments.map((c, i) => <Comments key={i} data={c} />)}
        </ScrollView>
        <TouchableOpacity onPress={() => setOpen(false)}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}
          >
            <Text>Amagar</Text>
            <MaterialIcons name='keyboard-arrow-up' size={24} color='black' />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <Text>No existeixen posts</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
  },
  avatarProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  avatarParent: {
    flex: 0.2,
  },
  avatar: {
    alignItems: 'center',
    marginTop: 16,
  },
  body: {
    flex: 0.8,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  topBody: {
    flexDirection: 'row',
  },
  name: {
    justifyContent: 'flex-start',
    flex: 0.6,
  },
  time: {
    flex: 0.4,
    justifyContent: 'flex-end',
    marginRight: 32,
  },
  TextTime: {
    fontSize: 13,
  },
  TextName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  TextTitleRol: {
    fontSize: 13,
    color: '#808080',
  },
  textBody: {
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
  },
  interactBtnParent: {
    padding: 8,
    flexDirection: 'row',
  },
  interactBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.5,
  },
  textInput: {
    width: '50%',
    borderColor: '#002100',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
});
