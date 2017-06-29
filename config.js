// exporting DB info to be used in server.js
exports.DATABASE_URL = 'mongodb://localhoset/spoiledVeggies';

// exporting PORT info for local or remote
exports.PORT = (process.env.PORT || 8080);