const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { signinValidate, signupValidate } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const { NotFound } = require('../utils/errors/errors');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

router.use(limiter);
router.use(helmet());

router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUser);

router.use(auth);
router.use('*', auth, (req, res, next) => next(new NotFound('Ресурс не найден')));

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
