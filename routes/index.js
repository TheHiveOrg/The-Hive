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
router.get('/mapData', function(req, res) {
    knex('bee_info').select().join('users', 'bee_info.user_id', 'users.id').where('users.google_id', req.user.id).then(function(data) {
        res.json(data);
    });
});

router.get('/userData', function(req, res) {
  knex('bee_info').select('bee_info.species', 'bee_info.image', 'users.first_name','users.last_name', 'bee_info.lat', 'bee_info.lng', 'users.id').join('users', 'bee_info.user_id', 'users.id').then(function(data) {
    res.json(data);
  })
});

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
        knex('users').select('users.id as users_id', '*').where("google_id", req.user.id),
        knex('bee_info').select('bee_info.id as bee_info_id', '*').join('users', 'user_id', '=', 'users.id').where('google_id', req.user.id)
    ]).then(function(data) {

        // console.log(data[1]);
        res.render('userProfile', {
            username: data[0][0],
            user: req.user,
            beeData: data[1]
        });
    });
});

router.get('/friendProfile/:id', ensureAuthenticated, function(req, res, next) {
   var userSession = req.user;
  return Promise.all([
    knex('users').select('users.id as users_id', '*').where('users.id', req.params.id),
    knex('bee_info').select('bee_info.id as bee_info_id' , '*').join('users', 'user_id', '=', 'users.id').where('google_id', req.user.id)
  ]).then(function(data) {
      console.log(data[0][0].id);
    res.render('friendProfile', {
      username: data[0][0],
      user: req.user,
      beeData: data[1]
    });
  }).catch(function(err){
    console.log(err);
  });

});

router.get('/editProfile', ensureAuthenticated, function(req, res, next) {
    knex('users').where("google_id", req.user.id).then(function(data) {
        res.render('editProfile', {
            data: data[0],
            user: req.user
        });
    });
});

router.get('/addBee', ensureAuthenticated, function(req, res, next) {
  splitBees = beeseed.reduce((result,item, i) => {
    var index = Math.floor(i/4)
    result[index] = result[index] || []
    result[index].push(item)
    return result
  }, [])
  console.log(splitBees);
    res.render('addBee', {
      title: 'Add Bee',
      user: req.user,
      splitBees: splitBees
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
    knex('users').where("google_id", req.user.id).update(req.body).then(function(data) {
        res.redirect('userProfile');
    });
});
router.post('/addBee', ensureAuthenticated, function(req, res, next) {
    knex('users').select('users.id').where("google_id", req.user.id).then(function(data) {
        req.body.user_id = data[0].id;
        knex('bee_info').insert(req.body).then(function() {
            res.redirect('/beeMap');
        });
    });
    knex('users').where("google_id", req.user.id).update(req.body).then(function(data) {
        res.redirect('userProfile');
    });
});
router.get('/:id/delete', function(req, res, next) {
    knex('bee_info').select().del().where("bee_info.id", req.params.id).then(function(data) {
        res.redirect('/userProfile');
    });
});

router.get('/:id/edit_beeInfo', function(req, res, next) {
    knex('bee_info').select().where('bee_info.id', req.params.id).then(function(data) {
        res.render('edit_beeInfo', {
            beeData: data,
            user: req.user
        });
    });
});

router.post('/:id/edit_beeInfo', ensureAuthenticated, function(req, res, next) {
    knex('bee_info').select('bee_info.id as bee_info_id', '*').update(req.body).where('bee_info.id', req.params.id).then(function(data) {
        console.log(req.params);
        console.log(req.body);
        res.redirect('/userProfile');
    });
});

router.get('/logout',
    function(request, response) {
        request.logout();
        response.redirect('/');
    });

module.exports = router;
