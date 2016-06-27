var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Hive' })

});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/userProfile', function(req, res, next) {
  res.render('userProfile', { title: 'Express' });
});

router.get('/editProfile', function(req, res, next) {
  res.render('editProfile', { title: 'Express' });
});

router.get('/addBee', function(req, res, next) {
  res.render('addBee', { title: 'Express' });
});

router.get('/beeInfo', function(req, res, next) {
  res.render('beeInfo', { title: 'Express' });
});

router.get('/beeMap', function(req, res, next) {
  res.render('beeMap', { title: 'Express' });
});

router.post('/editProfile', function(req, res, next) {
  res.render('editProfile', { title: 'Express' });
});

router.post('/addBee', function(req, res, next) {
  res.render('addBee', { title: 'Express' });
});

module.exports = router;
