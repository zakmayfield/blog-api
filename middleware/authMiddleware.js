const jwt = require('jsonwebtoken');
const db = require('../db/dbConfig');

/*
    This auth middleware will check the request headers for a bearer token

    Decode that token

    Create a user property on the request with the authorized user containing the { id, username, password } of the auth'd user

    
    Any route that uses this auth middleware will need to check the request headers for a token

    This also means that the users id, username, and password are all attached to the request headers on an authenticated route... meaning we can access user details from req rather than passing arguments like 'id'
*/

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await db('users')
        .where('id', decoded.id)
        .select('id', 'username', 'email')
        .first();

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error(`🚫 No Auth`);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error(`🚫 No token to authenticate`);
  }
};

module.exports = {
  auth,
};
