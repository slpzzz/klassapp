import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Followers() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarParent}>
        <Image
          style={styles.avatarProfile}
          source={{ uri: 'https://tds.cl/img/perfil-usuario.png' }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.topBody}>
          <Text style={styles.TextName}>sergi</Text>
          <Text style={styles.TextTitleRol}>Aficionaat del CF Voltrega</Text>
        </View>
      </View>
      <View style={styles.seguirbtnP}>
        <View style={styles.seguirbtn}>
          <Text style={{ color: 'white' }}>Seguir</Text>
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
    padding: 16,
  },
  avatarProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  avatarParent: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 0.7,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  seguirbtnP: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seguirbtn: {
    backgroundColor: '#487551',
    borderRadius: 20,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 0.6,
  },
  TextName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  textBody: {
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
