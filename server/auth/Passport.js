var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
const User = require('../models/User');
 passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: `${process.env.url}/auth/google/callback`,
    scope: ['profile', 'email']
  },
  async function(issuers, profile, done) {
    const email = profile.emails[0].value;
    let user = await User.findOne({email}) ;
  
   if(!user){
    user = await User.create({
      email,
      name: profile.displayName,
    });
   }
    done(null, user);
  }));
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });