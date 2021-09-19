import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

import PartitMin from '../../components/PartitMin';

import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isFav, putFavLeague, unFavLeague } from '../actions/profile';
import { CommonActions } from '@react-navigation/routers';

const FilterMatches = ({
  categoria,
  grup,
  jornada,
  jornadaLength,
  resultados,
  enrrere,
  endavant,
  navigation,
}) => {
  const [fav, setfav] = useState(false);
  const [id, setid] = useState();

  useEffect(() => {
    isFav(categoria, grup, setfav, setid);
  }, [categoria]);
  const toFav = () => {
    setfav(!fav);
    fav ? id && unFavLeague(id) : putFavLeague(categoria, grup, setid);
  };
  const height = Dimensions.get('screen').height;
  return (
    <View>
      <TouchableOpacity onPress={() => toFav()}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}
        >
          {fav ? (
            <AntDesign name='heart' size={24} color='#1C4928' />
          ) : (
            <AntDesign name='hearto' size={24} color='#1C4928' />
          )}
          <Text style={{ marginLeft: 5 }}>Marcar lliga com a favorita</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={{ height: (height * 2) / 3 }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
          }}
        >
          <View style={{ flex: 0.2 }}>
            {/*     {jornada > 1 && (
            <TouchableOpacity onPress={enrrere}>
              <AntDesign name='left' size={24} color='black' />
            </TouchableOpacity>
          )} */}
          </View>
          <View style={{ flex: 0.6, textAlign: 'center' }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#1C4928',
                fontSize: 18,
                padding: 7,
              }}
            >
              JORNADA {jornada}
            </Text>
          </View>
          <View style={{ flex: 0.2 }}>
            {/*   {jornada < jornadaLength && (
            <TouchableOpacity onPress={endavant}>
              <AntDesign
                style={{ justifyContent: 'flex-end', display: 'flex' }}
                name='right'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          )} */}
          </View>
        </View>
        {resultados.map((d, i) => (
          <View style={{ padding: 10 }}>
            <PartitMin
              key={i}
              resultados={d}
              categoria={categoria}
              navigation={navigation}
            />
          </View>
        ))}
        <View style={{ height: 10 }} />
      </ScrollView>
    </View>
  );
};

export default FilterMatches;
