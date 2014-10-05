var Article = require('models/article');
var log = require('logger');
var HttpError = require('error').HttpError;
var ServerError = require('error').ServerError;

exports.new = function (req, res){
    res.render('articles/new');
};

exports.edit = function(req, res, next) {
    Article.find(req.params.article_id).complete(function(err, article){
        if(err) { return next(new ServerError(500, 'Error on article searching: ' + err)); }
        if(article == null) { return next(new HttpError(404, 'Article not found')); }
        res.render('articles/edit', { id: article.id, title: article.title, text: article.text });
    });
};

exports.create = function(req, res) {
    Article.create({
        title: req.body.title,
        text: req.body.text
    }).complete(function(err){
        if(err){ return next(new ServerError(500, 'Error on article creation: ' + err)); }
        log.debug('Article created');
        res.redirect('/');
    });
};


exports.update = function(req, res, next) {
    var article_id = req.params.article_id;
    Article.find(article_id).
        complete(function(err, article){
            if(err){ return next(new ServerError(500, 'Error on article updating: ' + err)); }
            if(article == null) { return next(new HttpError(404, 'Article not found')); }

            article.updateAttributes({
                title: req.body.title,
                text: req.body.text
            }).complete(function(err){
                if(err){ return next(new ServerError(500, 'Error on article updating: ' + err)); }
                log.debug('Article updated');
                res.redirect('/');
            })

        });
};