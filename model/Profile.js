const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },

  rol: [
    {
      title: {
        type: String,
        required: true,
      },
      team: {
        type: String,
        required: true,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  following: [
    {
      user: { type: String },
      avatar: { type: String },
      rol: { type: [String] },
      iduser: { type: String },
    },
  ],
  followers: [
    {
      user: { type: String },
      avatar: { type: String },
      rol: { type: [String] },
      iduser: { type: String },
    },
  ],
  likes: [{ user: { type: String } }],

  favLeagues: [
    {
      categoria: { type: String },
      grup: { type: Number },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
