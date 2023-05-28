const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const SECRET_KEY = require('../utils/constants');

const {
  Unauthorized,
  InaccurateData,
  Conflict,
  NotFound,
} = require('../utils/errors/errors');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '7d',
      });
      res.send({ _id: token });
    })

    .catch((err) => {
      throw new Unauthorized(err.message);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .catch(next);
};

// if (err.message === 'NotFound') {
//   res
//     .status(ERROR_NOT_FOUND)
//     .send({ message: 'Пользователь по указанному _id не найден' });
//   return;
// }
// if (err.name === 'CastError') {
//   res.status(ERROR_INACCURATE_DATA).send({
//     message: 'Некорректный id пользователя',
//   });
//   return;
// }
// res
//   .status(ERROR_INTERNAL_SERVER)
//   .send({ message: 'На сервере произошла ошибка' });

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
  // .catch(() =>
  //   res
  //     .status(ERROR_INTERNAL_SERVER)
  //     .send({ message: 'На сервере произошла ошибка' })
  // );
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send({ data: user }))

    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new InaccurateData('Некорректный id пользователя'));
      }
      return next(err);
    });
  // .catch((err) => {
  //   if (err.message === 'NotFound') {
  //     res
  //       .status(ERROR_NOT_FOUND)
  //       .send({ message: 'Пользователь по указанному _id не найден' });
  //     return;
  //   }
  //   if (err.name === 'CastError') {
  //     res.status(ERROR_INACCURATE_DATA).send({
  //       message: 'Некорректный id пользователя',
  //     });
  //     return;
  //   }
  //   res
  //     .status(ERROR_INTERNAL_SERVER)
  //     .send({ message: 'На сервере произошла ошибка' });
  // });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new InaccurateData(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      }
      if (err.code === 11000) {
        return next(new Conflict('Пользователь с таким email уже существует'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, avatar ? { avatar } : { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new InaccurateData(
            'Переданы некорректные данные при обновлении данных профиля пользователя',
          ),
        );
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  login,
  getCurrentUser,
};
