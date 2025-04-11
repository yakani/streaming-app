const express = require('express');
const router = express.Router();
const { Insert, Get, Updateuser, Delete, Signin, AdminLogin, Sendcode, InsertAdmin, Authenticate } = require('../controllers/User.js');
const {protect}= require('../auth/Protect.js');
router.post('/',  Insert);
router.post('/login', Signin);
router.post('/admin',AdminLogin);
router.get('/',protect,Get);
router.get('/code',Sendcode);
router.post('/admin/insert',InsertAdmin);
router.get('/auth',protect,Authenticate);
router.put('/',protect,Updateuser);
router.delete('/:id',protect,Delete);
module.exports=router;