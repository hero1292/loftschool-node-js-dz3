const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
router.get('/login', authController.Auth);
router.post('/login', authController.Login);
router.get('/register', authController.Registration);
router.post('/register', authController.Register);

module.exports = router;