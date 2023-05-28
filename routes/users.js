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
  userAvatarValidate,
} = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', userIdValidate, getUserById);

router.patch('/me', userInfoValidate, updateUser);

router.patch('/me/avatar', userAvatarValidate, updateUser);

module.exports = router;
