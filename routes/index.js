var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../auth');
var knex = require('../db/knex');

function ensureAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/auth/google');
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'The Hive'
    });
});
// get about us
router.get('/aboutUs', function(req, res, next) {
    res.render('aboutUs', {
        title: 'The Hive'
    });
});

router.get('/aboutUs', function(req, res, next) {
    res.render('aboutUs', {
        title: 'About Us'
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

router.get('/signOut', function(request, response, next) {
    request.session = null;
    response.redirect('/');
});

router.get('/userProfile', ensureAuthenticated, function(req, res, next) {
    res.render('userProfile', {
        title: 'User Profile'
    });
});

router.get('/editProfile', ensureAuthenticated, function(req, res, next) {
    res.render('editProfile', {
        title: 'Edit Profile'
    });
});

router.get('/addBee', ensureAuthenticated, function(req, res, next) {
    res.render('addBee', {
        title: 'Add Bee'
    });
});

router.get('/beeInfo', ensureAuthenticated, function(req, res, next) {
    res.render('beeInfo', {
        title: 'Bee Info'
    });
});

router.get('/beeMap', function(req, res, next) {
    res.render('beeMap', {
        title: 'Bee Map'
    });
});

router.post('/editProfile', ensureAuthenticated, function(req, res, next) {
    res.render('editProfile', {
        title: 'Edit Profile'
    });
});

router.post('/addBee', ensureAuthenticated, function(req, res, next) {
    res.render('addBee', {
        title: 'Add Bee'
    });
});




module.exports = router;
