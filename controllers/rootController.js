var Article = require('models/article');
var log = require('logger');

exports.index = function(req, res) {
    var articles = Article.findAll({
        order: [["createdAt", "DESC"]]
    }).complete(function(err, articles){
        if(err) {
            log.error("Can't get articles: " + err);
            res.send(500, 'oops');
        } else {
            log.debug('Articles loaded');
            res.render('index', { articles: articles });
        }
    });
};