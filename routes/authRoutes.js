const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/logout', authController.logout);
router.post('/login', authController.login);
router.post('/register', authController.createUser);

module.exports = router;
