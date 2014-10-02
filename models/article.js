var db = require('db');

var Article = db.sequelize.define('Article', {
    title: db.Sequelize.STRING,
    text: db.Sequelize.STRING
});

module.exports = Article