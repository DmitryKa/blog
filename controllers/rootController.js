var Article = require('models/article');

exports.index = function(req, res) {
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
};