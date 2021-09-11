import axios from 'axios';
const uri = 'http://localhost:5000';

export const postNoti = async (id_post, id_user, type) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('www', id_post, id_user, type);
  const body = JSON.stringify({ id_post, type, id_user });

  await axios
    .post(`${uri}/api/noti`, body, config)
    .then(response => console.log(response.data))
    .catch(err => console.error(err));
};

export const getNotis = setdata => {
  axios
    .get(`${uri}/api/noti`)
    .then(response => setdata(response.data))
    .catch(err => console.error(err));
};
