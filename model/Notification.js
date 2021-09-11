const mongoose = require('mongoose');

const NotificacionSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  username: {
    type: String,
  },
  id_post: {
    type: String,
  },
  type: {
    type: String,
  },
  id_user: {
    type: String,
  },
  new: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Notification = mongoose.model(
  'notificacion',
  NotificacionSchema
);
