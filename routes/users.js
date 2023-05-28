const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

const {
  userIdValidate,
  userInfoValidate,
} = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', userIdValidate, getUserById);

router.patch('/me', userInfoValidate, updateUser);

router.patch('/me/avatar', userInfoValidate, updateUser);

module.exports = router;
