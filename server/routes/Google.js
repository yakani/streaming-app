const express= require('express');
const passport=require('passport');
const { Google } = require('../controllers/auth');
require('../auth/Passport');
const router = express.Router();

router.get('/google',passport.authenticate("google"));
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/signin'
  }), Google);

module.exports=router;
