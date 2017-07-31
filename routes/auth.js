const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


//show register form
router.get("/register", function (req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function (req, res) {
    let newUser = new User({username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/blogs");
        });

    });
});

//Show login form
router.get("/login", function(req, res) {
    res.render("login");
}) 

//Handle Login logic. Run middleware using local strategy then use callback
router.post("/login", passport.authenticate("local", { 
    successRedirect: "/blogs",
    failureRedirect: "/login"
 }), function(req, res) {
   
})

//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/blogs");
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;