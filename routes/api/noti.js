const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Notification = require('../../model/Notification');
const Profile = require('../../model/Profile');

router.get('/', auth, async (req, res) => {
  try {
    const noti = await Notification.find({ id_user: req.user.id })
      .sort({
        date: -1,
      })
      .populate('userid', ['name', 'avatar']);
    res.json(noti);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Errror');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let noti = await Notification.findOne({ _id: req.body._id });
    noti
      ? ((noti = await Notification.findOneAndUpdate(
          { _id: req.body._id },
          {
            new: true,
            upsert: true, // Make this update into an upsert
          }
        )),
        (noti.new = false))
      : (noti = new Notification({
          userid: req.user.id,
          id_post: req.body.id_post,
          type: req.body.type,
          id_user: req.body.id_user,
        })),
      await noti.save();
    res.json(noti);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Errror');
  }
});
module.exports = router;
