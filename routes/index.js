var express = require('express');
var router = express.Router();
var Article = require('models/article')

/* GET home page. */
router.get('/', function(req, res) {
    var articles = Article.findAll({
        order: [["createdAt", "DESC"]]
    }).complete(function(err, articles){
        if(err) {
            console.log("Can't get articles: " + err);
        } else {
            console.log('Articles loaded');
            res.render('index', { articles: articles });
        }
    });
});

module.exports = router;
