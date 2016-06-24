var db = require('./db/api')
var bcrypt = require('bcrypt');
var passport = require('passport');

var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(function (username, password, done) {
  db.findUserByUsername(username).then(function (user, err) {
    if (!user) {
      done("Error: User does not exist")
    } else if(user && bcrypt.compareSync(password, user.password)) {
      done(null, user)
    } else {
      done("Error: Password is incorrect")
    }
  })
}));

module.exports = {
  passport: passport,
  createUser: function (body) {
    var hash = bcrypt.hashSync(body.password, 8);
    body.password = hash;
    return db.addUser(body).then(function (id) {
      return id[0];
    })
  },
  isLoggedIn: function(req, res, next) {
   if (req.session.userId) {
     res.redirect('/home');
   } else {
     next();
   }
 },
 isNotLoggedIn: function(req, res, next) {
  if (!req.session.userId) {
    res.redirect('/');
  } else {
    next();
  }
 }
}
