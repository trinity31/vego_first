var express = require('express');
var router = express.Router();

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
	console.log('firstname:' + req.body.firstname);
	console.log('lastname:' + req.body.lastname);

	res.render('home', {
		fname: req.body.firstname
	});
})

module.exports = router;
