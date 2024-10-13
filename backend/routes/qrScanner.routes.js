const express = require('express');
const router = express.Router();
const {createQR, getQR, updateQR, deleteQR} = require('../controllers/qrScanner.controller');
const verifyUser = require('../util/verifyUser')


router.post('/', verifyUser, createQR)
router.get('/', verifyUser, getQR)
router.put('/:id', verifyUser, updateQR)
router.delete('/:id', verifyUser, deleteQR)


module.exports = router;