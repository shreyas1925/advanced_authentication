const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/user');
const { validateUser, validate } = require('../middlewares/validator');

//request from frontend
router.post('/create', validateUser, validate, createUser);

module.exports = router;