const express = require('express');
const router = express.Router();
const {createQR, getQR, updateQR, deleteQR, getQRByType, getQrByCollecctor} = require('../controllers/qrScanner.controller');
const verifyUser = require('../util/verifyUser')


router.post('/', verifyUser, createQR)
router.get('/', verifyUser, getQR)
router.get('/type/:type', verifyUser, getQRByType)
router.get('/collector', verifyUser, getQrByCollecctor)
router.put('/:id', verifyUser, updateQR)
router.delete('/:id', verifyUser, deleteQR)


module.exports = router;