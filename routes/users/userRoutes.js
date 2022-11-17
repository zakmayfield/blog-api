const route = require('express').Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');
const { auth } = require('../../middleware/authMiddleware');

route.get('/', auth, getUsers);
route.post('/', createUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);

module.exports = route;
