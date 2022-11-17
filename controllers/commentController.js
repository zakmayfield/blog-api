const db = require('../db/dbConfig');

// takes post id in req.params
const getComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await db('comments')
    .join('posts', 'posts.id', 'comments.post_id')
    .join('users', 'users.id', 'comments.user_id')
    .select(
      'comments.id',
      'users.username',
      'comments.body as comment',
      'comments.createdAt as date',
      'posts.id as post_id',
    )
    .where('post_id', postId)
    // sort by new
    .orderBy('date', 'desc');

  res.status(200).json(comments);
};

// takes post id in req.params
const createComment = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const body = req.body;

  if (!body.body) {
    res.status(400).json({
      error: `🚫 Comments require a body`,
    });
    throw new Error(`🚫 Comments require a body`);
  }

  const post = await db('posts').where('id', postId).first();

  if (post) {
    const payload = {
      user_id: userId,
      post_id: postId,
      ...body,
    };

    await db('comments').insert(payload);
  } else {
    res.status(400).json({
      error: `🚫 Cannot find post`,
    });
    throw new Error(`🚫 Cannot find post`);
  }

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
