const express = require('express');
const router = express.Router();
const {protect}= require('../auth/Protect.js');
const {  getHistory, deleteHistoryAll,  ReviewHistory, UpdateOne } = require('../controllers/History.js');

router.post('/review',ReviewHistory);
router.get('/', protect,getHistory);
router.delete('/',protect, deleteHistoryAll);
router.put('/',protect, UpdateOne);
module.exports = router;