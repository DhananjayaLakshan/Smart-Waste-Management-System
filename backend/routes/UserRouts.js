const express = require('express');
const router = express.Router();

const { login, register, getAllUsers } = require('../controllers/user.controller')
const verifyToken = require('../util/verifyUser');

router.post('/login', login)

router.post('/register', register)

router.get('/', getAllUsers)

module.exports = router;