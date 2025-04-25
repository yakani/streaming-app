const express = require('express');
const { GetAll, Insert } = require('../controllers/Comment.js');
const {protect}= require('../auth/Protect.js');
const router = express.Router();
router.get('/:id',GetAll);
router.post('/', protect, Insert);
module.exports=router;