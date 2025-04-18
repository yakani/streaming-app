const express = require('express');
const router = express.Router();
const {protect}= require('../auth/Protect.js');
const { addHistory, getHistory, deleteHistoryAll, deleteHistoryOne, ReviewHistory } = require('../controllers/History.js');
router.post('/',protect, addHistory);
router.post('/review',ReviewHistory);
router.get('/', protect,getHistory);
router.delete('/',protect, deleteHistoryAll);
router.delete('/:id',protect, deleteHistoryOne);
module.exports = router;