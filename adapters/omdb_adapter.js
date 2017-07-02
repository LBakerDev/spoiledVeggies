const tmbdKeys = require('../config');
const request = require('request');

exports.searchTitle = (title) => {
    let url = `${tmdbKeys.rootUrl}/3/movies/search?api_key=${tmdbKeys.key}&query=${title}`;
    request(url, (err, response, body) => {
        return body;
    });
};