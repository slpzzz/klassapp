import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import Demo from './Demo';

var width = Dimensions.get('screen').width;

export default function Labeltext({ type }) {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.button}>
      <TextInput
        value={text}
        placeholder={type}
        style={styles.buttonText}
        onChangeText={text => setText(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    marginBottom: 20,
    height: 60,
  },
  buttonText: {
    borderWidth: 1,
    borderColor: '#1C4928',
    borderRadius: 5,
    padding: 8,
    width: width - 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: '#1C4928',
    fontSize: 18,
  },
});
