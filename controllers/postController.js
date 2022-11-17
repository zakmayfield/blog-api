const db = require('../db/dbConfig');

// takes user id in params
const getPostsByUser = async (req, res) => {
  const { id } = req.params;

  const posts = await db('posts')
    .join('users', 'users.id', 'posts.user_id')
    .select(
      'users.username',
      'posts.id',
      'posts.title',
      'posts.body',
      'posts.createdAt'
    )
    .where('user_id', id);

  res.status(200).json(posts);
};

// takes user id in params
const createPost = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const payload = {
    ...body,
    user_id: id,
  };

  await db('posts').insert(payload);

  res.status(200).json(body);
};

// takes post id in params
const deletePost = async (req, res) => {
  const { postId } = req.params;

  let post = await db('posts').where('id', postId).first();
  await db('posts').where('id', postId).del();

  res.status(200).json(post);
};

module.exports = {
  getPostsByUser,
  createPost,
  deletePost,
};
