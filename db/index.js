var dbConfig = require('config').get('db');
var log = require('logger');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
    dialect: dbConfig.dialect,
    port: dbConfig.port
});

sequelize.
    authenticate().
    complete(function(err){
        if(err) {
            log.error('Error on database connecting: '+err);
        } else {
            log.info('Connected to database');
        }
    });

sequelize.sync().complete(function(err){
    if(err){
        log.error('Error occured on table creation: ' + err)
    } else {
        log.info('Database synchronized');
    }
});

exports.sequelize = sequelize;
exports.Sequelize = Sequelize;