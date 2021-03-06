import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../utils/setAuthToken';

const uri = 'http://localhost:5000';

export const isLogged = async navigation => {
  const value = await AsyncStorage.getItem('token');
  try {
    value
      ? (navigation.navigate('homeScreen'), setAuthToken(value))
      : console.log('out');
  } catch (err) {
    console.error('An error occurred', err);
  }
};

// Login

export const login = async ({ email, password, navigation }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    await axios.post(`${uri}/api/auth`, body, config).then(function (response) {
      AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('homeScreen');
      setAuthToken(response.data.token);
    });
  } catch (err) {
    console.error('An error occurred', err);
  }
};

// Logout
export const logout = navigation => {
  localStorage.removeItem('token');
  navigation.push('home');
};

// Register

export const register = async ({
  name,
  email,
  birth,
  password,
  navigation,
}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, birth, password, navigation });
  try {
    await axios
      .post(`${uri}/api/users`, body, config)
      .then(function (response) {
        AsyncStorage.setItem('token', response.data.token);

        setAuthToken(response.data.token);
        navigation.navigate('signup2');
      });
  } catch (err) {
    //const errors = err.response.data.errors;
    console.error('An error occurred', err);
  }
};

// Create Profile

export const createProfile = (rol, bio, location, navigation) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(navigation);
  const body = JSON.stringify({ bio, location, rol });

  try {
    axios
      .post(`${uri}/api/profile`, body, config)
      .then(() => navigation.navigate('followFirst'));
  } catch (err) {
    console.error('An error occurred', err);
  }
};
