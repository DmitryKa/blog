var express = require('express');
var router = express.Router();
var Article = require('models/article')

router.get('/new', function(req, res){
    res.render('articles/new');
});

router.post('/create', function(req, res){
    Article.create({
        title: req.body.title,
        text: req.body.text
    }).complete(function(err){
        if(err){
            console.log('Error on article creation: ' + err)
        } else {
            console.log('Article created')
            res.redirect('/');
        }
    });
});

module.exports = router;