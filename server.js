const bodyParser    = require('body-parser'),
methodOverride      = require("method-override"),
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
app.use(methodOverride("_method"));


// Mongoose model configuration

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    body: {type: String, required: true},
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

// Update Route
app.put("/blogs/:id/", function(req,res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

// Delete Route
app.delete("/blogs/:id/", function(req,res) {
    // destroy post
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err){
            console.log("This is jacked");
            res.redirect('/blogs');
        } else {
            console.log("Delete successful");
            res.redirect("/blogs");
        }
    });
})

app.listen(process.env.PORT || 8080, function() {
    console.log('Server is Running!')
});

module.exports = {app};