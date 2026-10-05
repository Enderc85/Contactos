var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

router.get('/login', authController.formularioLogin);
router.post('/login', authController.login);

router.get('/register', authController.formularioRegister);
router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;
