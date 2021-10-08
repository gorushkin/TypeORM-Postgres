import express, { json, Request, Response } from 'express';

const router = express.Router();
import { Post } from './entity/Post';
import { User } from './entity/User';

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(201).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const createPost = async (req, res) => {
  const { title, body, userUuid } = req.body;
  try {
    const user = await User.findOne({ uuid: userUuid });
    if (!user) throw Error('User is not defind');
    // const post = Post.create({ title, body });
    const post = new Post(title, body, user);
    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getAllPostsWithUser = async (req, res) => {
  try {
    const posts = await Post.find({ relations: ['user'] });
    return res.status(201).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

router.get('/', getPosts);
router.get('/all', getAllPostsWithUser);
router.post('/', createPost);

export { router };
