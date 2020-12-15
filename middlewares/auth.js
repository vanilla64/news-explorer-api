const jwt = require('jsonwebtoken');

const { JWT_DEV } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const { wrongTokenMsg, needAuthMsg } = require('../utils/constants');

const AuthError = require('../errors/AuthError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization
    || !authorization.startsWith('Bearer ')) {
    throw new AuthError(needAuthMsg);
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET : JWT_DEV,
    );

    req.user = payload;
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new AuthError(wrongTokenMsg));
    }
    next(err);
  }

  return next();
};
