const express = require('express');
const router = express.Router();
const { createUser, signin } = require('../controllers/user');
const { validateUser, validate } = require('../middlewares/validator');

//request from frontend
router.post('/create', validateUser, validate, createUser);

router.post('/signin', signin)

module.exports = router;