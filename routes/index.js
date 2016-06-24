var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
