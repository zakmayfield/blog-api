require('dotenv').config();
const db = require('../db/dbConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });


// authenticated : auth
const getUsers = async (req, res) => {
  let users = await db('users');
  res.status(200).json(users);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      error: `🚫 Please include all fields`,
    });
    throw new Error(`🚫 Please include all fields`);
  }

  let user = await db('users').where('username', username).first();

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({
      error: `🚫 Invalid Credentials`,
    });
    throw new Error(`🚫 Invalid Credentials`);
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      error: `🚫 Please include all fields`,
    });
    throw new Error(`🚫 Please include all fields`);
  }

  let usernameExists = await db('users').where('username', username).first();
  let emailExists = await db('users').where('email', email).first();

  if (usernameExists) {
    res.status(400).json({
      error: `🚫 Username is not available`,
    });
    throw new Error(`🚫 Username is not available`);
  }

  if (emailExists) {
    res.status(400).json({
      error: `🚫 Email is not available`,
    });
    throw new Error(`🚫 Email is not available`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    username,
    email,
    password: hashedPassword,
  };

  await db('users').insert(user);
  const createdUser = await db('users')
    .where('username', user.username)
    .first();

  res.status(201).json({
    username: user.username,
    email: user.email,
    token: generateToken(createdUser.id),
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  let user = await db('users').where('id', id).first();

  if (user) {
    await db('users').where('id', id).update(payload);
    res.status(200).json(payload);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  let user = await db('users').where('id', id).first();
  await db('users').where('id', id).del();
  res.status(200).json(user);
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
