const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', getUserById);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUser);

module.exports = router;
