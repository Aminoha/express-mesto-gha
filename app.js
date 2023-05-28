const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const { NotFound } = require('./utils/errors/errors');
const { createUser, login } = require('./controllers/users');
const { signinValidate, signupValidate } = require('./middlewares/validation');

const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', signinValidate, login);
app.post('/signup', signupValidate, createUser);

app.use(router);
app.use('*', (req, res, next) => next(new NotFound('Ресурс не найден')));

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
