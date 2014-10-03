var express = require('express');
var router = express.Router();
var articlesController = require('controllers/articlesController');

router.get('/new', articlesController.new);
router.post('/create', articlesController.create);

module.exports = router;