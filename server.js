const bodyParser    = require('body-parser'),
mongoose            = require('mongoose'),
express             = require('express'),
app                 = express();

// include config.js for PORT and DB info
//const { PORT, DATABASE_URL } = require('./config');
mongoose.connect("mongodb://localhost/spoiledveggies");

// App configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// Mongoose model configuration

const blogSchema = new mongoose.Schema({
    title: {type: String, required: false},
    image: {type: String, required: false},
    body: {type: String, required: false},
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);


//RESTful Routes

// route to GET all blog posts
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// Index Route
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    })
})

// New Route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// Create route
app.post("/blogs", function(req,res) {
    // create blog
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err){
            console.log(err);
            res.render("new");
        } else {
            // then, redirect to index
            res.redirect("/blogs");
            console.log("Post submitted")
        }

    })
    
})

// Show route
app.get("/blogs/:id", function(req,res) {
   
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect('/blogs');
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
})

// Edit Route
app.get("/blogs/:id/edit", function(req,res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    })
})


app.listen(process.env.PORT || 8080, function() {
    console.log('Server is Running!')
});

module.exports = {app};