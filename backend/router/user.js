const express = require('express');
const router = express.Router();
const { createUser, signin, verifyEmail, forgetPassword, resetPassword } = require('../controllers/user');
const { isResetTokenValid } = require('../middlewares/user');
const { validateUser, validate } = require('../middlewares/validator');

//request from frontend
router.post('/create', validateUser, validate, createUser);

router.post('/signin', signin)

router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgetPassword)
router.post('/reset-password', isResetTokenValid, resetPassword)

module.exports = router