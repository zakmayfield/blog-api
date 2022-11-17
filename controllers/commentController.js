const db = require('../db/dbConfig');

// takes post id in req.params
const getComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await db('comments')
    .join('posts', 'posts.id', 'comments.post_id')
    .join('users', 'users.id', 'comments.user_id')
    .select(
      'posts.id as post_id',
      'comments.id',
      'users.username as author',
      'comments.body as comment',
      'comments.createdAt as date'
    )
    .where('post_id', postId)
    // sort by new
    .orderBy('date', 'desc');

  res.status(200).json(comments);
};

// takes post id in req.params
const createComment = async (req, res) => {
  const { postId } = req.params;
  const user_id = 2;
  const body = req.body;
  const payload = {
    user_id,
    post_id: postId,
    ...body,
  };

  await db('comments').insert(payload);

  res.status(200).json(body);
};

// takes comment id in req.body
const updateComment = async (req, res) => {
  const id = req.body.id;
  const body = req.body;

  await db('comments').where('id', id).update(body);

  res.status(200).json(body);
};

// takes comment id in req.body
const deleteComment = async (req, res) => {
  const id = req.body.id;
  const body = req.body;

  await db('comments').where('id', id).del();

  res.status(200).json(body);
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
