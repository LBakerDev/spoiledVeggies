

let config = {
    production: {
        DATABASE_URL: process.env.DATABASE_URL,
        PORT: process.env.PORT || 8080
    },
    development: {
        DATABASE_URL: process.env.DATABASE_URL ||
        global.DATABASE_URL ||
        'mongodb://localhost/spoiledveggies',
        PORT: (process.env.PORT || 8080)
    },
    test: {
        DATABASE_URL: 'mongodb://baker:baker@ds141082.mlab.com:41082/spoiledveggies-test', // Update to mlab test db
        PORT: (process.env.PORT || 8081)
    },
};

module.exports = config[process.env.NODE_ENV || 'development'];