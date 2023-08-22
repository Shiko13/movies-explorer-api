const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/AuthorizationError');

const jwtSecret = process.env.JWT_SECRET;
const nodeEnv = process.env.NODE_ENV;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Неправильные почта или пароль'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, nodeEnv === 'production' ? jwtSecret : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError('Неправильные почта или пароль'));
  }

  req.user = payload;
  next();
};
