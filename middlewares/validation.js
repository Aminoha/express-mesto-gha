const { celebrate, Joi } = require('celebrate');
const { regexLink } = require('../utils/constants');

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(regexLink),
  }),
});

const userIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const userInfoValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(regexLink),
  }),
});

const cardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexLink),
  }),
});

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  signinValidate,
  signupValidate,
  userIdValidate,
  userInfoValidate,
  cardValidate,
  cardIdValidate,
};
