
var config = {
    port: 3000,
    db: {
        name    : 'blog',
        user    : 'postgres',
        password: 'root',
        port    : 5432,
        dialect : 'postgres'
    }
};

config.get = function(property){
    return config[property];
};

module.exports = config;