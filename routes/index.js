var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../auth');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
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
        failureRedirect: '/login'
    }),
    function(request, response) {
        response.redirect('/');
    });

router.get('/signOut', function(request, response, next) {
    request.session = null;
    response.redirect('/');
});

router.get('/userProfile', function(req, res, next) {
    res.render('userProfile', {
        title: 'User Profile'
    });
});

router.get('/editProfile', function(req, res, next) {
    res.render('editProfile', {
        title: 'Edit Profile'
    });
});

router.get('/addBee', function(req, res, next) {
    res.render('addBee', {
        title: 'Add Bee'
    });
});

router.get('/beeInfo', function(req, res, next) {
    res.render('beeInfo', {
        title: 'Bee Info'
    });
});

router.get('/beeMap', function(req, res, next) {
    res.render('beeMap', {
        title: 'Bee Map'
    });
});

router.post('/editProfile', function(req, res, next) {
    res.render('editProfile', {
        title: 'Edit Profile'
    });
});

router.post('/addBee', function(req, res, next) {
    res.render('addBee', {
        title: 'Add Bee'
    });
});

module.exports = router;
