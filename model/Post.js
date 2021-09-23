const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  avatar: {
    type: String,
  },
  sticker: {
    type: [String],
  },
  partido: {
    equip1: { type: String },
    equip2: { type: String },
    dia: { type: String },
    hora: { type: String },
    competicio: { type: String },
    resultat: { type: String },
  },
  rol: [
    {
      title: {
        type: String,
      },
      team: {
        type: String,
      },
    },
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
