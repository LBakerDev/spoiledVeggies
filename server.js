const bodyParser    = require('body-parser'),
mongoose            = require('mongoose'),
express             = require('express'),
app                 = express();

// include config.js for PORT and DB info
//const { PORT, DATABASE_URL } = require('./config');
mongoose.connect("mongodb://localhost/spoiledveggies");

// App configuration
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// Mongoose model configuration

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    body: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);



//RESTful Routes

app.get()





app.listen(process.env.PORT || 8080, function() {
    console.log('Server is Running!')
});

module.exports = {app};