var Article = require('models/article');

exports.new = function (req, res){
    res.render('articles/new');
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
