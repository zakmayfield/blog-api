const route = require('express').Router();

route.use('/users', require('../routes/users/userRoutes'));
route.use('/posts', require('../routes/posts/postRoutes'))
route.use('/posts/comments', require('../routes/comments/commentRoutes'));

route.use('/', (req, res) => {
  res.send('✅ /api');
});

module.exports = route;
