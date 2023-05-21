const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');
const { ERROR_NOT_FOUND } = require('./utils/errors/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '646900196b0db344f98e555c',
  };

  next();
});

app.use(router);
app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({
    message: 'Ресурс не найден',
  });
});

app.listen(PORT);
