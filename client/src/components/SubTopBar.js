import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

var width = Dimensions.get('screen').width;

export default function TopBar({ pressed, setPressed }) {
  const selected = index => {
    setPressed(pressed => {
      pressed = [false, false, false];
      const newList = [...pressed];

      newList[index] = !newList[index];

      return newList;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => selected(0)}
        style={pressed[0] ? styles.containerSelect : styles.containerSubTop}
      >
        <Text style={pressed[0] ? styles.isSelected : styles.noSelected}>
          Seguint
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selected(1)}
        style={pressed[1] ? styles.containerSelect : styles.containerSubTop}
      >
        <Text style={pressed[1] ? styles.isSelected : styles.noSelected}>
          Destacats
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selected(2)}
        style={pressed[2] ? styles.containerSelect : styles.containerSubTop}
      >
        <Text style={pressed[2] ? styles.isSelected : styles.noSelected}>
          Descobreix
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // width: '100%',
    width: width,
    height: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    flexDirection: 'row',
    //  flex: 1,
  },
  containerSubTop: {
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSelect: {
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#491C3D',
    borderBottomWidth: 2,
    marginBottom: 0,
  },

  noSelected: {
    color: '#764668',
  },
  isSelected: {
    color: '#491C3D',
  },
});
