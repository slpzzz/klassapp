const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../model/Post');
const Profile = require('../../model/Profile');
const User = require('../../model/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Public

router.post(
  '/',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //const user = await User.findById(req.user.id).select('-password');
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar']
      );
      const newPost = new Post({
        text: req.body.text,
        sticker: req.body.partido
          ? req.body.partido.categoria
          : req.body.sticker,
        username: profile.user.name,
        avatar: profile.user.avatar,
        rol: profile.rol,
        user: req.user.id,
        partido: req.body.partido ? req.body.partido.resultados : null,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    //const profile = await Profile.findOne({ user: req.user.id });
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/following
// @desc    Get all posts
// @access  Private

router.get('/following', auth, async (req, res) => {
  try {
    const following = [{ user: req.user.id }];
    const profile = await Profile.findOne({ user: req.user.id });
    const posts = await Post.find();

    /*    profile.following.map(d => {
      //following.push({ user: d.iduser });
    }); */

    //console.log(profile);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/me
// @desc    Get all posts me
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    //const profile = await Profile.findOne({ user: req.user.id });
    const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    Get all posts by ID
// @access  Private

router.get('/:id', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort({ date: -1 });

    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});
// @route   GET api/posts/single/:id
// @desc    Get post by ID
// @access  Private

router.get('/single/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authoritze' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id });

    // Check if the post has already been liked
    if (post.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    profile.likes.unshift({ user: req.params.id });
    post.likes.unshift({ user: req.user.id });

    await post.save();
    await profile.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id });

    // Check if the post has not yet been liked
    if (!post.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    profile.likes = profile.likes.filter(({ user }) => user !== req.params.id);
    await profile.save();

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private

router.post(
  '/comment/:id',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/delete/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.find();
    console.log(post);
    //post = post.filter(d => d._id !== req.params.comment_id);
    post = post.filter(d => d._id !== req.params.comment_id);

    console.log(post);
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/filter
// @desc    Get all posts by filter
// @access  Private

router.get('/filter/:name_sticker', auth, async (req, res) => {
  try {
    //const profile = await Profile.findOne({ user: req.user.id });
    const posts = await Post.find({ sticker: req.params.name_sticker }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/filter/bests/all', auth, async (req, res) => {
  try {
    //const profile = await Profile.findOne({ user: req.user.id });

    const posts = await Post.find().sort({ likes: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
