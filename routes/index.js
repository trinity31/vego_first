var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../db.js');
var bcrypt = require('bcryptjs');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', function(req, res, next) {
  var drinks = [
    { name: 'Bloody Mary', drunkness:3 },
    { name: 'Martini', drunkness: 5 },
    { name: 'Scotch', drunkness: 10 }
  ];

  var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

  res.render('index', {
    drinks: drinks,
    tagline: tagline
  });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/join', function(req, res, next) {
  res.render('join');
});

router.post('/join', function(req, res, next) {
	var body = _.pick(req.body, 'firstname', 'lastname', 'email', 'password');

	if(req.body.password !== req.body.confirm_password) {
		console.log('Incorrect password');
		return res.status(400).json(e);
	}

	db.user.create(body).then(function(user) {
		//res.status(200).json(user.toPublicJSON());
		res.render('home', {
			firstname: req.body.firstname
		});
	}, function(e) {
		res.status(400).json(e);
	});
})

module.exports = router;
