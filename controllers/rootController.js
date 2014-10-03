var Article = require('models/article');

exports.index = function(req, res) {
    var articles = Article.findAll({
        order: [["createdAt", "DESC"]]
    }).complete(function(err, articles){
        if(err) {
            console.log("Can't get articles: " + err);
            res.send(500, 'oops');
        } else {
            console.log('Articles loaded');
            res.render('index', { articles: articles });
        }
    });
};