const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const Profile = require('../../model/Profile');
const User = require('../../model/User');
const Post = require('../../model/Post');

// @route   GET api/profile/me
// @desc    -Get current users profile
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar', 'birth']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }

  const { bio, location, rol } = req.body;

  //Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (rol) profileFields.rol = rol;

  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar', 'birth']
    );
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).populate('user', ['name', 'avatar', 'birth']);
      return res.json(profile);
    }

    //Create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Errror');
  }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Private

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:userid
// @desc    Get profile by user
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar', 'birth']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.king == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove users posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/follow/:follow_id
// @desc    Add profile follow
// @access  Private

router.put('/follow/:follow_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
      'birth',
    ]);
    const profile = await Profile.findOne({
      user: req.params.follow_id,
    }).populate('user', ['name', 'avatar', 'birth']);

    const follower = {
      user: user.user.name,
      avatar: user.user.avatar,
      rol: user.rol,
      iduser: req.user.id,
    };
    const following = {
      user: profile.user.name,
      avatar: profile.user.avatar,
      rol: profile.rol,
      iduser: req.params.follow_id,
    };

    user.following.unshift(following);
    profile.followers.unshift(follower);

    await user.save();
    await profile.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/unfollow/:follow_id
// @desc    un from profile
// @access  Private
router.put('/unfollow/:follow_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const user = await Profile.findOne({ user: req.params.follow_id });

    //Get remove index he from following
    profile.following = profile.following.filter(
      ({ iduser }) => iduser !== req.params.follow_id
    );
    user.followers = user.followers.filter(
      ({ iduser }) => iduser !== req.user.id
    );

    await user.save();
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/rol/:rol_id
// @desc    Delete rol from profile
// @access  Private
router.delete('/rol/:rol_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.rol
      .map(item => item.id)
      .indexOf(req.params.rol_id);
    profile.rol.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/follow/:follow_id
// @desc    Add profile follow
// @access  Private

router.put('/favleague', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    const favLeague = {
      categoria: req.body.categoria,
      grup: req.body.grup,
    };

    profile.favLeagues.unshift(favLeague);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/favleague', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    console.log(profile);
    const cat = profile.favLeagues.filter(
      d => d.categoria == req.body.categoria
    );
    const grup = cat.filter(d => d.grup == req.body.grup);

    //Get remove index
    const removeIndex = profile.favLeagues
      .map(item => item.id)
      .indexOf(grup._id);

    profile.favLeagues.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
