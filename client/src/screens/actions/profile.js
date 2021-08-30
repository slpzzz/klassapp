import axios from 'axios';
import { useState } from 'react';

const uri = 'http://localhost:5000';

export const getProfileMe = setDatos => {
  axios
    .get(`${uri}/api/profile/me`)
    .then(response => setDatos(response.data))
    .catch(err => console.error(err));
};
export const ifFollow = (setHandle, id) => {
  setHandle(false);
  try {
    axios.get(`${uri}/api/profile/me`).then(response => {
      response.data.following.map(d => d.iduser === id && setHandle(true));
    });
  } catch (err) {
    console.error('An error occurred', err);
  }
};

export const getPostsMe = (posts, user_id) => {
  try {
    axios.get(`${uri}/api/posts`).then(function (response) {
      if (response.data) {
        response.data.map(d => {
          if (user_id === d.user) {
            posts.push(d);
          }
        });
      }
    });
  } catch (err) {
    console.error('An error ocurred', err);
  }
};

export const getProfiles = setDatos => {
  try {
    axios.get(`${uri}/api/profile/`).then(function (response) {
      setDatos(response.data);
    });
  } catch (err) {
    console.error('An error ocurred', err);
  }
};

export const follow = id_user => {
  try {
    axios.put(`${uri}/api/profile/follow/${id_user}`);
  } catch (err) {
    console.error('An error ocurred', err);
  }
};

export const unfollow = id_user => {
  try {
    axios.put(`${uri}/api/profile/unfollow/${id_user}`);
  } catch (err) {
    console.error('An error ocurred', err);
  }
};
