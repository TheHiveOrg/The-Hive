var db = require('./db/api');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(obj, done){
  done(null, obj);
});
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/google/callback',

},
function(accessToken, refreshToken, profile, done){
   db.findUserById(profile.id).then(function(id){
     if(id){
       return done(null, profile);
     }else{
       db.createUser(profile).then(function(id){
         return done(null, profile);
       });
     }
   });
 }));
 module.exports = {
   passport: passport
 };
