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

Blog.create({
    title: "First Post",
    image: "https://unsplash.com/?photo=JIISwPwxPD8",
    body: "This is surely the first Post"
})

Blog.create({
    title: "Second Post",
    image: "https://unsplash.com/?photo=kQzFr1JqSKM",
    body: "I promise this is the second Post"
})

Blog.create({
    title: "Third Post",
    image: "https://unsplash.com/?photo=kQzFr1JqSKM",
    body: "There is no doubt that this is the third and final post"
})


//RESTful Routes

// route to GET all blog posts
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    })
})





app.listen(process.env.PORT || 8080, function() {
    console.log('Server is Running!')
});

module.exports = {app};