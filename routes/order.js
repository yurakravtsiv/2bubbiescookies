var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('order', { title: 'Order' });
});

module.exports = router;
