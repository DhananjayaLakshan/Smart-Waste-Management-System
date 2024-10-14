const express = require('express');
const router = express.Router();
const {createQR, getQR, updateQR, deleteQR, getQRByType, getAllWaste} = require('../controllers/qrScanner.controller');
const verifyUser = require('../util/verifyUser')


router.post('/', verifyUser, createQR)
router.get('/', verifyUser, getQR)
router.get('/type/:type', verifyUser, getQRByType)
router.put('/:id', verifyUser, updateQR)
router.delete('/:id', verifyUser, deleteQR)
router.get('/get-all-waste', getAllWaste)


module.exports = router;