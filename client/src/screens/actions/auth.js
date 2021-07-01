import axios from 'axios';

export const login = (email, password) => {
  axios.get('/api/auth').then();

  /* 
    const config = {
        'Content-Type': 'application/json'
    },
    const body = JSON.stringify({email, password})

    try{
        const res = await axios.post('/api/auth', body, config)
    } catch(err){
        const errors = err.response.data.errors;
        console.log(errors)
    } */
};

export const register = ({ name, email, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    axios.post('https://localhost:5000/api/users', body, config);
    console.log(body);
  } catch (err) {
    const errors = err.response.data.errors;

    console.error('An error occurred', err);
  }
};
