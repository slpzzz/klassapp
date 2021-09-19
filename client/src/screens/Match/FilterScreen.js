import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { AntDesign } from '@expo/vector-icons';

import data from '../../competicio.json';
import FilterMatches from './FilterMatches';
import Button1 from '../../components/Button1';

export default function Filter(navigation) {
  const [categoria, setCategoria] = useState('1aCat');
  const [categoria1, setCategoria1] = useState('1aCat');
  const [grup, setGrup] = useState(1);
  const [grup1, setGrup1] = useState(1);
  const [jornada, setJornada] = useState(1);
  const [jornada1, setJornada1] = useState(1);
  const [jornadaLength, setJornadaLenth] = useState();
  const [resultados, setResultados] = useState([]);
  const [cercar, setCercar] = useState(false);

  const search = () => {
    const cat = data.find(d => d.competicio === categoria);
    const gr = cat.grups.find(d => d.grup === grup);
    const jr = gr.jornades.find(d => d.jornada === jornada);
    setJornadaLenth(gr.jornades.length);
    setResultados(jr.partits);
    setJornada1(jornada);
    setCercar(true);
    setCategoria1(categoria);
    setGrup1(grup);
  };

  const canviarJornada = type => {
    setJornada1(type === 'enrrere' ? jornada1 - 1 : jornada1 + 1);
    const cat = data.find(d => d.competicio === categoria);
    const gr = cat.grups.find(d => d.grup === grup);
    const jr = jornada1 > 0 && gr.jornades.find(d => d.jornada === jornada1);
    setResultados(jr.partits);
  };

  return cercar ? (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Picker
            style={{
              borderWidth: 0,
              borderColor: '#1C4928',
              marginRight: 20,
              height: 32,
              justifyContent: 'center',
              padding: 8,
            }}
            onValueChange={item => setCategoria(item)}
          >
            {data.map((d, i) => (
              <Picker.Item
                key={'categoria' + i}
                value={d.competicio}
                label={d.competicio}
              />
            ))}
          </Picker>
          <View>
            {data.map(
              (d, i) =>
                d.competicio === categoria && (
                  <Picker
                    style={{
                      borderWidth: 0,
                      borderColor: '#1C4928',
                      marginRight: 20,
                      height: 32,
                      justifyContent: 'center',
                      padding: 8,
                    }}
                    onValueChange={item => setGrup(item)}
                  >
                    {d.grups.map((g, i) => (
                      <Picker.Item
                        key={'grups' + i}
                        value={g.grup}
                        label={g.grup}
                      />
                    ))}
                  </Picker>
                )
            )}
          </View>
          <View>
            {data.map(
              (d, i) =>
                d.competicio === categoria &&
                d.grups.map(
                  (g, i) =>
                    g.grup === grup && (
                      <Picker
                        style={{
                          borderWidth: 0,
                          borderColor: '#1C4928',
                          marginRight: 20,
                          height: 32,
                          justifyContent: 'center',
                          padding: 8,
                        }}
                        onValueChange={item => setJornada(parseInt(item))}
                      >
                        {g.jornades.map((j, i) => (
                          <Picker.Item
                            key={'jornada' + i}
                            value={j.jornada}
                            label={j.jornada}
                          />
                        ))}
                      </Picker>
                    )
                )
            )}
          </View>
          <TouchableOpacity onPress={() => search()}>
            <View
              style={{
                backgroundColor: '#1C4928',
                width: 50,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                padding: 8,
              }}
            >
              <Text style={{ color: 'white' }}>Cercar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FilterMatches
        categoria={categoria1}
        grup={grup1}
        jornada={jornada1}
        jornadaLength={jornadaLength}
        resultados={resultados}
        enrrere={() => canviarJornada('enrrere')}
        endavant={() => canviarJornada('endavant')}
        navigation={navigation.navigation}
      />
    </View>
  ) : (
    <View style={styles.demo}>
      <View style={{ padding: 10 }}>
        <Text>Categoria: </Text>
        <Picker
          style={{
            borderWidth: 0,

            marginRight: 20,
            height: 32,
            width: 150,
            justifyContent: 'center',
            padding: 8,
          }}
          onValueChange={item => setCategoria(item)}
        >
          {data.map((d, i) => (
            <Picker.Item
              key={'categoria' + i}
              value={d.competicio}
              label={d.competicio}
            />
          ))}
        </Picker>
      </View>
      <View style={{ padding: 10 }}>
        <Text>Grup: </Text>
        {data.map(
          (d, i) =>
            d.competicio === categoria && (
              <Picker
                style={{
                  borderWidth: 0,

                  marginRight: 20,
                  height: 32,
                  width: 150,
                  justifyContent: 'center',
                  padding: 8,
                }}
                onValueChange={item => setGrup(item)}
              >
                {d.grups.map((g, i) => (
                  <Picker.Item
                    key={'grups' + i}
                    value={g.grup}
                    label={g.grup}
                  />
                ))}
              </Picker>
            )
        )}
      </View>
      <View style={{ padding: 10 }}>
        <Text>Jornada: </Text>
        {data.map(
          (d, i) =>
            d.competicio === categoria &&
            d.grups.map(
              (g, i) =>
                g.grup === grup && (
                  <Picker
                    style={{
                      borderWidth: 0,
                      borderColor: '#1C4928',
                      marginRight: 20,
                      height: 32,
                      width: 150,
                      justifyContent: 'center',
                      padding: 8,
                    }}
                    onValueChange={item => setJornada(parseInt(item))}
                  >
                    {g.jornades.map((j, i) => (
                      <Picker.Item
                        key={'jornada' + i}
                        value={j.jornada}
                        label={j.jornada}
                      />
                    ))}
                  </Picker>
                )
            )
        )}
      </View>

      <TouchableOpacity onPress={() => search()}>
        <Button1 value={'Cerca'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  demo: {
    padding: 20,
    height: '100%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
