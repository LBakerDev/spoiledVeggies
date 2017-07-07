

const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchemes");


//RESTful Routes

// route to GET all blog posts
router.get("/", function(req, res) {
    res.redirect("/blogs");
});

// Index Route
router.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    })
})

// New Route
router.get("/blogs/new", function(req, res) {
    res.render("new");
});

// Create route
router.post("/blogs", function(req,res) {
    // create blog
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err){
            console.log(err);
            
        } else {
            // then, redirect to index
            res.redirect("/blogs");
            console.log("Post submitted")
        }

    })
    
})

// Show route
router.get("/blogs/:id", function(req,res) {
   
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect('/blogs');
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
})

// Edit Route
router.get("/blogs/:id/edit", function(req,res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    })
})

// Update Route
router.put("/blogs/:id/", function(req,res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

// Delete Route
router.delete("/blogs/:id/", function(req,res) {
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

module.exports = router;