const route = require('express').Router();
const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require('../../controllers/commentController');

route.get('/:postId', getComments);
route.post('/:postId', createComment);
route.put('/', updateComment);
route.delete('/', deleteComment);

module.exports = route;
