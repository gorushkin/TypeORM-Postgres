import express, { json, Request, Response } from 'express';
import { validate } from 'class-validator';

const router = express.Router();
import { User } from './entity/User';

const addUser = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = User.create({ name, email, role });
    const errors = await validate(user);

    if (errors) throw errors;
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ relations: ['posts'] });
    return res.status(201).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  const { uuid } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findOne({ uuid });
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ uuid });
    await user.remove();
    return res.status(204).json({ message: 'User was removed' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getUser = async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ uuid });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

router.post('/', addUser);
router.get('/', getUsers);
router.put('/:uuid', updateUser);
router.delete('/:uuid', deleteUser);
router.get('/:uuid', getUser);

export { router };
