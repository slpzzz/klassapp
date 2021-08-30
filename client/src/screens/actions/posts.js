import axios from 'axios';

const uri = 'http://localhost:5000';

export const addPost = (sticker, text) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ sticker, text });
  try {
    axios.post(`${uri}/api/posts`, body, config);
  } catch (err) {
    console.error('An error ocurred', err);
  }
};

export const getPostFollows = async (datos, setDatos) => {
  const usersFollowing = [];
  //const res = axios.get(`${uri}/api/posts`);
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };
  const profile = await axios.get(`${uri}/api/profile/me`).then(response => {
    usersFollowing.push(response.data.user._id);
    response.data.following.map(d => usersFollowing.push(d.iduser));
  });
  const res = await axios
    .get(`${uri}/api/posts`)
    .then(response => {
      response.data.map((dataUsers, i2) => {
        usersFollowing.map(d => {
          if (d === dataUsers.user) {
            datos.push(dataUsers);
          }
        });
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const myPosts = setDatos => {
  axios
    .get(`${uri}/api/posts/me`)
    .then(response => setDatos(response.data))
    .catch(err => console.err(err));
};

export const likePost = async (id_post, setLike) => {
  await axios
    .put(`${uri}/api/posts/like/${id_post}`)
    .then(() => setLike(true))
    .catch(err => console.error(err));
};

export const unlikePost = async (id_post, setLike) => {
  await axios
    .put(`${uri}/api/posts/unlike/${id_post}`)
    .then(() => setLike(false))
    .catch(err => console.error(err));
};

export const isLike = (setLike, id) => {
  axios
    .get(`${uri}/api/profile/me`)
    .then(response =>
      response.data.likes.map(d => d.user === id && setLike(true))
    );
  axios
    .get(`${uri}/api/posts`)
    .then(response2 => {
      response2.data.map(
        d => d.likes.length > 0 && d.likes.filter(({ user }) => user !== id)
      );
    })
    .catch(err => console.error(err));
};

export const addComment = (text, id_post) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ text });
  try {
    axios.post(`${uri}/api/posts/comment/${id_post}`, body, config);
  } catch (err) {
    console.error('An error ocurred', err);
  }
};
