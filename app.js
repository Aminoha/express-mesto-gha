const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');
const { ERROR_NOT_FOUND } = require('./utils/errors/errors');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(router);
app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({
    message: 'Ресурс не найден',
  });
});

app.use(errorHandler);

app.listen(PORT);
