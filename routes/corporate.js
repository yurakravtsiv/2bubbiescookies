var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('corporate', { title: 'Corporate' });
});

module.exports = router;
