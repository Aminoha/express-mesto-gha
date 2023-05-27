const jwt = require('jsonwebtoken');

const { ERROR_UNAUTHORIZED } = require('../utils/errors/errors');

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
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
};
