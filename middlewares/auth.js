const jwt = require('jsonwebtoken');

const { ERROR_UNAUTHORIZED } = require('../utils/errors/errors');
const { SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
};
