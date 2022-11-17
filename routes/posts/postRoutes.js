const route = require('express').Router();

const {
  getPostsByUser,
  createPost,
  deletePost,
  updatePost,
} = require('../../controllers/postController');

// auth
route.get('/', getPostsByUser);
route.post('/', createPost);
route.delete('/:postId', deletePost);
route.put('/:postId', updatePost);

module.exports = route;
