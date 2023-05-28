const jwt = require('jsonwebtoken');

const { Unauthorized } = require('../utils/errors/errors');
const { SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    throw new Unauthorized('Необходима авторизация');
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }

  req.user = payload;
  next();
};
