var Article = require('models/article');

exports.new = function (req, res){
    res.render('articles/new');
};

exports.edit = function(req, res, next) {
    Article.find(req.params.article_id).complete(function(err, article){
        if(err) {
            console.log('Error on article searching: ' + err);
            res.send(500, 'oops');
        } else {
            if(article == null) {
                var err = {status: 404, message: 'Article not found' }
                console.log(err.message);
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
            console.log('Error on article creation: ' + err)
        } else {
            console.log('Article created');
            res.redirect('/');
        }
    });
};

exports.update = function(req, res, next) {
    var article_id = req.params.article_id;
    Article.find(article_id).
        complete(function(err, article){
            if(err){
                console.log('Error on article updating: ' + err)
            } else {
                if(article == null) {
                    err = 'Article is not found';
                    console.log(err)
                    next(err);
                }else {
                    article.updateAttributes({
                        title: req.body.title,
                        text: req.body.text
                    }).complete(function(err){
                        if(err){
                            console.log('Error on article updating: ' + err)
                            res.redirect('/');
                        } else { console.log('Article updated'); }
                        res.redirect('/');
                    })

                }
             }
        });
};