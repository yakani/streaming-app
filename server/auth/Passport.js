var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
const User = require('../models/User');
 passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:7000/auth/google/callback"
  },
  async function(issuers, profile, done) {
    const user = await User.findOne({googleId:profile.id}) ;
    if(user){
      return done(null, user);
    }
    const newUser = await User.create({
      googleId: profile.id,
      name: '',
      email: '',
    });
    done(null, newUser);
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