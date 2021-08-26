import axios from 'axios';
import { useState } from 'react';

const uri = 'http://localhost:5000';

export const getProfileMe = (setDatos1, setDatos, posts) => {
  try {
    axios.get(`${uri}/api/profile/me`).then(function (response) {
      if (response.data) {
        setDatos && setDatos(response.data.user);
        setDatos1 && setDatos1(response.data);
        posts && getPostsMe(posts, response.data.user._id);
      }
    });
  } catch (err) {
    console.error('An error occurred', err);
  }
};
export const ifFollow = (setHandle, id) => {
  try {
    axios.get(`${uri}/api/profile/me`).then(function (response) {
      if (response.data) {
        return response.data.following.map(d =>
          d.iduser === id
            ? (setHandle(true), console.log('true', d.user, d.iduser, id))
            : (setHandle(false), console.log('false', d.user, d.iduser, id))
        );
      }
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
    axios.delete(`${uri}/api/profile/follow/${id_user}`);
  } catch (err) {
    console.error('An error ocurred', err);
  }
};
