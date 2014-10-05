var Article = require('models/article');
var log = require('logger');
var ServerError = require('error').ServerError;

exports.index = function(req, res, next) {
    var articles = Article.findAll({
        order: [["createdAt", "DESC"]]
    }).complete(function(err, articles){
        if(err) { return next(new ServerError(500, "Can't get articles: " + err)); }
        log.debug('Articles loaded');
        res.render('index', { articles: articles });
    });
};