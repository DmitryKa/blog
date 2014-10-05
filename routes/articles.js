var express = require('express');
var router = express.Router();
var articlesController = require('controllers/articlesController');

router.get('/new', articlesController.new);
router.get('/:article_id/edit', articlesController.edit);
router.post('/', articlesController.create);
router.put('/:article_id', articlesController.update);
router.delete('/:article_id', articlesController.delete);

module.exports = router;