import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FavLeague from '../../components/FavLeague';

import { getFavLeagues } from '../actions/profile';
import Loading from '../Loading';

export default function Favorits(navigation) {
  const [data, setdata] = useState([]);
  useEffect(() => getFavLeagues(setdata));

  return data ? (
    <View>
      {data.length > 0 ? (
        <ScrollView>
          {data.map((d, i) => (
            <FavLeague key={i} data={d} navigation={navigation.navigation} />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            padding: 40,
            flex: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Agrega les teves primeres lligues</Text>
        </View>
      )}
    </View>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  demo: {
    height: 180,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
