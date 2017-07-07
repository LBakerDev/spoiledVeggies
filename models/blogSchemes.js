// Mongoose model configuration

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {type: String, required: false},
    movieName: {type: String, required: false},
    image: {type: String, required: false},
    body: {type: String, required: false},
    created: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Blog", blogSchema);