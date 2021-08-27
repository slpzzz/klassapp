import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Etiqueta from './Etiqueta';
import { FontAwesome } from '@expo/vector-icons';
import { likePost, unlikePost, isLike } from '../screens/actions/posts';
import { getProfileMe } from '../screens/actions/profile';

export default function Post({ datos }) {
  const [like, setLike] = useState(false);
  const [numLikes, setNumLikes] = useState();

  useEffect(() => {
    isLike(setLike, datos._id);
    datos.likes && setNumLikes(datos.likes.length);
  }, []);

  return datos ? (
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
            <FontAwesome name='comment-o' size={13} color='black' />
            <Text style={{ marginLeft: 8 }}>
              {datos.comments ? datos.comments.length : 0}
            </Text>
          </View>
          <View style={styles.interactBtn}>
            <TouchableOpacity
              onPress={() =>
                like
                  ? (unlikePost(datos._id, setLike), setNumLikes(numLikes - 1))
                  : (likePost(datos._id, setLike), setNumLikes(numLikes + 1))
              }
            >
              <FontAwesome
                name='soccer-ball-o'
                size={13}
                color={like ? '#1C4928' : 'black'}
              />
            </TouchableOpacity>
            <Text style={{ marginLeft: 8 }}>{datos.likes ? numLikes : 0}</Text>
          </View>
        </View>
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
});
