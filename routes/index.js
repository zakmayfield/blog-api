const route = require('express').Router();
const { loginUser } = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');

route.use('/users', require('../routes/users/userRoutes'));
route.use('/posts', auth, require('../routes/posts/postRoutes'));
route.use('/posts/comments', auth, require('../routes/comments/commentRoutes'));

route.post('/login', loginUser);

route.use('/', (req, res) => {
  res.send('✅ /api');
});

module.exports = route;
