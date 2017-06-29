const bodyParser    = require('body-parser'),
mongoose            = require('mongoose'),
express             = require('express'),
app                 = express();

// include config.js for PORT and DB info
const { PORT, DATABASE_URL } = require('./config');



//mongoose.connect('mongodb://localhost/spoiledveggies');


// title
// image
// body
// created

app.set("view engine", "ejs");
app.use(express.static('public'));



















app.listen(process.env.PORT || 8080);

module.exports = {app};