// exporting DB info to be used in server.js
exports.DATABASE_URL = 'mongodb://baker:baker@ds141082.mlab.com:41082/spoiledveggies'||
                        process.env.DATABASE_URL ||
                        global.DATABASE_URL ||
                        'mongodb://localhost/spoiledveggies';

exports.tmdbKeys = {
    key: 'd7838b9854a256a599c99d276726be6d',
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzgzOGI5ODU0YTI1NmE1OTljOTlkMjc2NzI2YmU2ZCIsInN1YiI6IjU5NTkxYjYyYzNhMzY4MjhlNzAyNWJkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UQPvOOVh2Xjs7fYZUjGk8GGnjgQL5zDUQ4BofLkKQNg',
    rootUrl: 'https://api.themoviedb.org/3/'
}

// exporting PORT info for local or remote
exports.PORT = (process.env.PORT || 8080);