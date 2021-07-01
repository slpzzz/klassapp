import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Etiqueta from './Etiqueta';
import { FontAwesome } from '@expo/vector-icons';

export default function Post() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarParent}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarProfile}
            source={{ uri: 'https://tds.cl/img/perfil-usuario.png' }}
          />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.topBody}>
          <View style={styles.name}>
            <Text style={styles.TextName}>sergi</Text>
          </View>
          <View style={styles.time}></View>
          <Text style={styles.TextTime}>21:32</Text>
        </View>
        <Text style={styles.TextTitleRol}>Aficionaat del CF Voltrega</Text>
        <View>
          <Text style={styles.textBody}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            lobortis aliquam tincidunt. Vestibulum facilisis ultrices erat.
            Etiam tincidunt eu mi quis condimentum.{' '}
          </Text>
        </View>
        <View>
          <Etiqueta />
        </View>
        <View style={styles.interactBtnParent}>
          <View style={styles.interactBtn}>
            <FontAwesome name='comment-o' size={13} color='black' />
            <Text style={{ marginLeft: 8 }}>0</Text>
          </View>
          <View style={styles.interactBtn}>
            <FontAwesome name='soccer-ball-o' size={13} color='black' />
            <Text style={{ marginLeft: 8 }}> 2</Text>
          </View>
        </View>
      </View>
    </View>
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
