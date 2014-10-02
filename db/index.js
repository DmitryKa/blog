var dbConfig = require('config').get('db');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
    dialect: dbConfig.dialect,
    port: dbConfig.port
});

sequelize.
    authenticate().
    complete(function(err){
        if(err) {
            console.log('Error on database connecting: '+err);
        } else {
            console.log('Connected to database');
        }
    });

sequelize.sync().complete(function(err){
    if(err){
        console.log('Error occured on table creation: ' + err)
    } else {
        console.log('Database synchronized');
    }
});

exports.sequelize = sequelize;
exports.Sequelize = Sequelize;