const bodyParser    = require('body-parser'),
methodOverride      = require("method-override"),
mongoose            = require('mongoose'),
express             = require('express'),
app                 = express(),
Blog                = require("./models/blogSchemes");

const blogRoutes    = require("./routes/blog");

// include config.js for PORT and DB info
//const { PORT, DATABASE_URL } = require('./config');
mongoose.connect("mongodb://localhost/spoiledveggies");

// App configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(blogRoutes);



app.listen(process.env.PORT || 8080, function() {
    console.log('Server is Running!')
});

module.exports = {app};