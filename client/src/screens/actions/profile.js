import axios from 'axios';
import { useState } from 'react';

const uri = 'http://localhost:5000';

export const getProfileMe = (setDatos, setDatos1) => {
  axios
    .get(`${uri}/api/profile/me`)
    .then(response => {
      setDatos && setDatos(response.data);
      setDatos1 && setDatos1(response.data.user);
    })
    .catch(err => console.error(err));
};
export const ifFollow = (setHandle, id, setMe) => {
  setHandle(false);
  try {
    axios.get(`${uri}/api/profile/me`).then(response => {
      response.data.user._id === id && setMe(true);
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
export const getProfile = (
  setDatos,
  setDatos1,
  id_profile,
  setFollowers,
  setFollowing
) => {
  axios
    .get(`${uri}/api/profile/user/${id_profile}`)
    .then(response => {
      setDatos && setDatos(response.data);
      setDatos1 && setDatos1(response.data.user);
      setFollowers && setFollowers(response.data.followers);
      setFollowing && setFollowing(response.data.following);
    })
    .catch(err => console.error('An error ocurred', err));
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

export const putFavLeague = async (categoria, grup, setid) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ categoria, grup });

  await axios
    .put(`${uri}/api/profile/favleague`, body, config)
    .then(response =>
      setid(d._id)
        ? response.data.favLeagues.map(
            d => d.categoria === categoria && d.grup === grup && setid(d._id)
          )
        : console.log(response.data)
    )
    .catch(err => console.error(err));
};

export const unFavLeague = async id => {
  await axios
    .delete(`${uri}/api/profile/favleague/${id}`)
    .catch(err => console.error(err));
};

export const getFavLeagues = setdata => {
  axios
    .get(`${uri}/api/profile/me`)
    .then(response => setdata(response.data.favLeagues))
    .catch(err => console.error(err));
};

export const isFav = (categoria, grup, setfav, setid) => {
  setfav(false);
  axios
    .get(`${uri}/api/profile/me`)
    .then(response =>
      response.data.favLeagues.map(
        fav => 
          fav.categoria === categoria &&
            fav.grup === grup &&
            (setid(fav._id), setfav(true)),
        
      )
    )
    .catch(err => console.error(err));
};
