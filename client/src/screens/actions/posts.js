import axios from 'axios';

const uri = 'http://localhost:5000';

export const addPost = (sticker, text, partido) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ sticker, text, partido });
  try {
    axios.post(`${uri}/api/posts`, body, config);
  } catch (err) {
    console.error('An error ocurred', err);
  }
};

export const getPostFollows = async (datos, setDatos) => {
  const usersFollowing = [];
  const datosA = [];
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
  usersFollowing.length === 1
    ? await axios
        .get(`${uri}/api/posts/me`)
        .then(response => setDatos(response.data))
        .catch(err => console.err(err))
    : await axios
        .get(`${uri}/api/posts`)
        .then(response => {
          console.log(response.data);
          response.data.map((dataUsers, i2) => {
            console.log(dataUsers);
            usersFollowing.map(d => {
              if (d === dataUsers.user) {
                datosA.push(dataUsers);
              }
            });
          });
        })
        .catch(function (error) {
          console.error(error);
        });
  console.log('dA', datosA);

  setDatos(datosA);
};

export const getStickerPosts = (setDatos, name_sticker) => {
  axios
    .get(`${uri}/api/posts/filter/${name_sticker}`)
    .then(response => setDatos(response.data))
    .catch(err => console.error(err));
};

export const getBestPosts = setDatos => {
  axios
    .get(`${uri}/api/posts/filter/bests/all`)
    .then(response => {
      setDatos(response.data);
    })
    .catch(err => console.error(err));
};

export const getAllPosts = setDatos => {
  axios
    .get(`${uri}/api/posts`)
    .then(response => setDatos(response.data))
    .catch(err => console.error(err));
};

export const getOnePost = (id_post, setData) => {
  axios
    .get(`${uri}/api/posts/single/${id_post}`)
    .then(response => setData(response.data))
    .catch(err => console.error);
};

export const myPosts = setDatos => {
  axios
    .get(`${uri}/api/posts/me`)
    .then(response => setDatos(response.data))
    .catch(err => console.err(err));
};

export const userPost = (params, setData) => {
  axios
    .get(`${uri}/api/posts/${params}`)
    .then(response => setData(response.data))
    .catch(err => console.error(err));
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

export const isLike = (setLike, id, id_user, setMe) => {
  axios.get(`${uri}/api/profile/me`).then(response => {
    response.data.user._id === id_user && setMe(true);
    response.data.likes.map(d => d.user === id && setLike(true));
  });
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

export const deleteComment = id_post => {
  axios
    .put(`${uri}/api/posts/comment/delete/${id_post}`)
    .then(response => console.log(response.data))
    .catch(err => console.error(err));
};
