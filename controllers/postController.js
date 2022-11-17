const db = require('../db/dbConfig');

// {{ auth }} id = req.user.id
const getPostsByUser = async (req, res) => {
  const id = req.user.id;

  const outputFormatter = (post) => {
    let output = {
      author: post.post_author,
      title: post.post_title,
      body: post.post_body,
      comments: [],
    };

    if (!output.comments) {
      output.comments = [];
    }

    const {
      id,
      post_author,
      post_title,
      post_body,
      post_date,
      ...commentDetails
    } = post;

    output.comments.push(commentDetails);

    return output;
  };

  // const posts = await db('posts')
  //   .join('comments', 'comments.post_id', 'posts.id')
  //   .join('users', 'users.id', 'posts.user_id')
  //   .select(
  //     'posts.id',
  //     'users.username as post_author',
  //     'posts.title as post_title',
  //     'posts.body as post_body',
  //     'posts.createdAt as post_date',
  //     'comments.body as comment_body',
  //     'comments.createdAt as comment_date'
  //   )
  //   .where('posts.user_id', id)
  //   .then((records) => {
  //     // console.log('records ->', records);
  //     return records.map((record) => outputFormatter(record));
  //   });

  const posts = await db('posts')
    .join('users', 'users.id', 'posts.user_id')
    .select(
      'posts.id',
      'users.username',
      'posts.title',
      'posts.body',
      'posts.createdAt'
    )
    .where('user_id', id)

  res.status(200).json(posts);
};

// {{ auth }} id = req.user.id
const createPost = async (req, res) => {
  const id = req.user.id;
  const body = req.body;

  if (!body.title || !body.body) {
    res.status(400).json({
      error: `🚫 Blog posts require a title and body`,
    });
    throw new Error(`🚫 Blog posts require a title and body`);
  }

  const payload = {
    ...body,
    user_id: id,
  };

  await db('posts').insert(payload);
  res.status(200).json(body);
};

// {{ auth }} id = req.user.id
// check auth id against user_id on post
// finally delete blog post with :postId slug
const deletePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  let post = await db('posts')
    .select('username', 'user_id')
    .where('id', postId)
    .first();

  if (post && post.user_id === userId) {
    await db('posts').where('id', postId).del();
  } else if (!post) {
    res.status(400).json({
      error: `🚫 Cannot locate blog post`,
    });
    throw new Error(`🚫 Cannot locate blog post`);
  } else {
    res.status(400).json({
      error: `🚫 Not authorized to DELETE this blog`,
    });
    throw new Error(`🚫 Not authorized to DELETE this blog`);
  }

  res.status(200).json(post);
};

// {{ auth }} id = req.user.id
// check auth id against user_id on post
// finally update blog post with :postId slug
const updatePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const body = req.body;

  let post = await db('posts').select('user_id').where('id', postId).first();

  if (post && post.user_id === userId) {
    let payload = {
      ...body,
    };

    await db('posts').where('id', postId).update(payload);
  } else if (!post) {
    res.status(400).json({
      error: `🚫 Cannot locate blog post`,
    });
    throw new Error(`🚫 Cannot locate blog post`);
  } else {
    res.status(400).json({
      error: `🚫 Not authorized to UPDATE this blog`,
    });
    throw new Error(`🚫 Not authorized to UPDATE this blog`);
  }

  res.status(200).json(body);
};

module.exports = {
  getPostsByUser,
  createPost,
  deletePost,
  updatePost,
};
