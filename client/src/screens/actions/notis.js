import axios from 'axios';
const uri = 'http://localhost:5000';

export const postNoti = async (id_post, id_user, type, _id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ id_post, type, id_user, _id });

  await axios
    .post(`${uri}/api/noti`, body, config)
    .catch(err => console.error(err));
};

export const getNotis = setdata => {
  axios
    .get(`${uri}/api/noti`)
    .then(response => setdata(response.data))
    .catch(err => console.error(err));
};

export const isNoti = setOn => {
  axios
    .get(`${uri}/api/noti`)
    .then(response =>
      response.data.map(d =>  d.new && setOn(true))
    )
    .catch(err => console.error(err));
};
