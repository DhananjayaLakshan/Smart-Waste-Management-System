const express = require('express');
const router = express.Router();
const {createQR, getQR, updateQR, deleteQR} = require('../controllers/qrScanner.controller');
const verifyUser = require('../util/verifyUser')


router.post('/', verifyUser, createQR)
router.get('/', verifyUser, getQR)
router.put('/', verifyUser, updateQR)
router.delete('/', verifyUser, deleteQR)


module.exports = router;