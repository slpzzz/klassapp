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
  deleteComment,
} from '../screens/actions/posts';
import { getProfileMe } from '../screens/actions/profile';
import Comments from './Comments';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import sty from '../../styles';
import Date from './Date';
import moment from 'moment';
import { postNoti } from '../screens/actions/notis';
import MatchPost from './MatchPost';
import { AntDesign } from '@expo/vector-icons';

export default function Post({ datos, navigation }) {
  const [like, setLike] = useState(false);
  const [numLikes, setNumLikes] = useState();
  const [comment, setComment] = useState();
  const [open, setOpen] = useState(false);
  const [openWritter, setOpenWritter] = useState(false);
  const [me, setMe] = useState(false);

  useEffect(() => {
    isLike(setLike, datos._id, datos.user, setMe);
    datos.likes && setNumLikes(datos.likes.length);
  }, []);

  const newComment = () => {
    addComment(comment, datos._id);
    setComment('');
    postNoti(datos._id, datos.user, 'comment');
  };

  const Delete = () => {
    deleteComment(datos._id);
  };

  moment.locale('ca');
  const dia = moment(datos.date, 'YYYY-MM-DDThh:mm:ss').fromNow();

  return datos ? (
    <View>
      <TouchableOpacity
        onPress={() => navigation && navigation.push('Post', datos._id)}
      >
        <View style={styles.container}>
          <View style={styles.avatarParent}>
            <TouchableOpacity
              onPress={() => navigation && navigation.push('user', datos.user)}
            >
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
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.topBody}>
              <View style={styles.name}>
                <Text style={styles.TextName}>{datos.username}</Text>
              </View>
              <View style={styles.time}>
                {/* <Date data={datos.date} /> */}
                <Text style={styles.textTime}>{dia}</Text>
              </View>
            </View>
            {datos.rol.length > 0 && (
              <Text style={styles.TextTitleRol}>
                {datos.rol[0].title} {datos.rol[0].team}
              </Text>
            )}
            <View>
              <Text style={styles.textBody}>{datos.text}</Text>
            </View>
            <View>
              {datos.partido && <MatchPost resultados={datos.partido} />}
            </View>
            <View style={{ flexDirection: 'row', padding: 3 }}>
              <ScrollView horizontal={true}>
                {datos.sticker &&
                  datos.sticker.map((d, i) => {
                    return (
                      <Etiqueta key={i} datos={d} navigation={navigation} />
                    );
                  })}
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
                      : (likePost(datos._id, setLike),
                        setNumLikes(numLikes + 1),
                        postNoti(datos._id, datos.user, 'like'))
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
              {me && (
                <TouchableOpacity onPress={() => Delete()}>
                  <AntDesign name='delete' size={18} color='red' />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          display: open ? 'block' : 'none',
          backgroundColor: '#dedede',
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.push('Comment', datos)}>
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

        <ScrollView
          style={
            datos.comments && datos.comments.length > 2
              ? { height: 200 }
              : { height: 'auto' }
          }
        >
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
    justifyContent: 'space-between',
  },
  name: {
    //justifyContent: 'flex-start',
    //flex: 0.6,
  },
  time: {
    //flex: 0.4,
    // justifyContent: 'flex-end',
    // marginRight: 32,
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
