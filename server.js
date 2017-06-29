const bodyParser    = require('body-parser'),
mongoose            = require('mongoose'),
express             = require('express'),
app                 = express();

// include config.js for PORT and DB info
const { PORT, DATABASE_URL } = require('./config');



//mongoose.connect('mongodb://localhost/spoiledveggies', { useMongoClient: true});


// title
// image
// body
// created

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// create blogSchema

const blogSchema = new mongoose.Schema({

}) 
















app.listen(process.env.PORT || 8080, function() {
    console.log('Server is Running!')
});

module.exports = {app};