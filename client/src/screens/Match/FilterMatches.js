import { View, Text } from 'react-native';
import React, { useState } from 'react';

import PartitMin from '../../components/PartitMin';

import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { putFavLeague, unFavLeague } from '../actions/profile';

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
  console.log('000', navigation);
  const [fav, setfav] = useState(false);
  const toFav = () => {
    fav ? unFavLeague(categoria, grup) : putFavLeague(categoria, grup);
    setfav(!fav);
  };
  return (
    <View>
      <TouchableOpacity onPress={() => toFav()}>
        <View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
          {fav ? (
            <AntDesign name='heart' size={24} color='black' />
          ) : (
            <AntDesign name='hearto' size={24} color='black' />
          )}
          <Text style={{ marginLeft: 5 }}>Marcar liga como favorita</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <View style={{ flex: 0.2 }}>
          {jornada > 1 && (
            <TouchableOpacity onPress={enrrere}>
              <AntDesign name='left' size={24} color='black' />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 0.6, textAlign: 'center' }}>
          <Text>JORNADA {jornada}</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          {jornada < jornadaLength && (
            <TouchableOpacity onPress={endavant}>
              <AntDesign
                style={{ justifyContent: 'flex-end', display: 'flex' }}
                name='right'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        {resultados.map((d, i) => (
          <PartitMin
            key={i}
            resultados={d}
            categoria={categoria}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
};

export default FilterMatches;
