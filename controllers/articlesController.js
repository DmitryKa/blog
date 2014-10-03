var Article = require('models/article');
var log = require('logger');

exports.new = function (req, res){
    res.render('articles/new');
};

exports.edit = function(req, res, next) {
    Article.find(req.params.article_id).complete(function(err, article){
        if(err) {
            log.error('Error on article searching: ' + err);
            res.send(500, 'oops');
        } else {
            if(article == null) {
                var err = {status: 404, message: 'Article not found' }
                log.error(err.message);
                next(err);
            } else {
                res.render('articles/edit', { id: article.id, title: article.title, text: article.text });
            }
        }
    });
};

exports.create = function(req, res) {
    Article.create({
        title: req.body.title,
        text: req.body.text
    }).complete(function(err){
        if(err){
            log.error('Error on article creation: ' + err)
        } else {
            log.debug('Article created');
            res.redirect('/');
        }
    });
};

exports.update = function(req, res, next) {
    var article_id = req.params.article_id;
    Article.find(article_id).
        complete(function(err, article){
            if(err){
                log.error('Error on article updating: ' + err)
            } else {
                if(article == null) {
                    err = 'Article is not found';
                    log.debug(err)
                    next(err);
                }else {
                    article.updateAttributes({
                        title: req.body.title,
                        text: req.body.text
                    }).complete(function(err){
                        if(err){
                            log.error('Error on article updating: ' + err)
                            res.redirect('/');
                        } else { log.debug('Article updated'); }
                        res.redirect('/');
                    })

                }
             }
        });
};