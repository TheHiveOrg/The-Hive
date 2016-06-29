var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../auth');
var beeseed = require('../beeseed');
var beeFact = require('../beefact');
var knex = require('../db/knex');

function ensureAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/');
}
/* GET home page. */
router.get('/beeseed', function(req, res) {
    res.json(beeseed);
});
router.get('/beefact', function(req, res) {
    res.json(beeFact);
});
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'The Hive',
        user: req.user
    });
});
// get about us
router.get('/aboutUs', function(req, res, next) {
    res.render('aboutUs', {
        title: 'The Hive',
        user: req.user
    });
});
router.get('/auth/google', auth.passport.authenticate('google', {
    scope: ['openid email profile']
}));
router.get('/auth/google/callback', auth.passport.authenticate('google', {
        failureRedirect: '/auth/google'
    }),
    function(request, response) {
        response.redirect('/userProfile');
    });
router.get('/userProfile', ensureAuthenticated, function(req, res, next) {
  return Promise.all([
    knex('users').select().where("google_id", req.user.id),
    knex('bee_info').select().join('users', 'user_id', '=', 'users.id').where('google_id', req.user.id)
    ]).then(function(data) {
    res.render('userProfile', {
      username: data[0][0],
      user: req.user,
      beeData: data[1]
    })

    });
});
router.get('/editProfile', ensureAuthenticated, function(req, res, next) {
  knex('users').where("google_id", req.user.id).then(function(data){
    res.render('editProfile', {
        data: data[0]
    });
});
});
router.get('/addBee', ensureAuthenticated, function(req, res, next) {
    res.render('addBee', {
        title: 'Add Bee',
        user: req.user
    });
});
router.get('/beeInfo', ensureAuthenticated, function(req, res, next) {
    res.render('beeInfo', {
        title: 'Bee Info',
        user: req.user
    });
});
router.get('/beeMap', function(req, res, next) {
    res.render('beeMap', {
        title: 'Bee Map',
        user: req.user
    });
});
router.post('/editProfile', ensureAuthenticated, function(req, res, next) {
    knex('users').where("google_id", req.user.id).update(req.body).then(function(data){
    res.redirect('userProfile');
    })
});
router.post('/addBee', ensureAuthenticated, function(req, res, next) {
  knex('users').select('users.id').where("google_id", req.user.id).then(function(data){
    req.body.user_id = data[0].id;
    knex('bee_info').insert(req.body).then(function(){
      res.redirect('/beeMap')
    })
  });
});
router.get('/logout',
    function(request, response) {
        request.logout();
        response.redirect('/');
    });
module.exports = router;
