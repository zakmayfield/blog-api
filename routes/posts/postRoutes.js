const route = require('express').Router();
const {
  getPostsByUser,
  createPost,
  deletePost
} = require('../../controllers/postController');

route.get('/:id', getPostsByUser);
route.post('/:id', createPost);
route.delete('/:postId', deletePost);

module.exports = route;
