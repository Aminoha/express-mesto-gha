const User = require('../models/user');

const {
  ERROR_INACCURATE_DATA,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_INACCURATE_DATA).send({
          message: 'Некорректный id пользователя',
        });
        return;
      }
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_INACCURATE_DATA).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
        return;
      }
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(ERROR_INACCURATE_DATA).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
        return;
      }
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(ERROR_INACCURATE_DATA).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
        return;
      }
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
