const bodyParser = require('body-parser'),
    //morgan              = require('morgan'),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    passport = require('passport'),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Blog = require("./models/blogSchemes");

const blogRoutes = require("./routes/blog");
const config = require('./config');

const { DATABASE_URL, PORT } = config;


// App configuration
//app.use(morgan('common'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(blogRoutes);

// PASSPORT config
app.use(require("express-session")({
    secret: "The greatest blog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Gives local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let server;


function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    console.log(databaseUrl, 'Server Running!');
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }

            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log("Closing Server");
        server.close(err => {
            if (err) {
                reject(err);
                // so we don't also call `resolve()`
                return;
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

//show register form
app.get("/register", function (req, res) {
    res.render("register");
});

//handle sign up logic
app.post("/register", function (req, res) {
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
app.get("/login", function(req, res) {
    res.render("login");
}) 

//Handle Login logic. Run middleware using local strategy then use callback
app.post("/login", passport.authenticate("local", { 
    successRedirect: "/blogs",
    failureRedirect: "/login"
 }), function(req, res) {
   
})

module.exports = { app, server, runServer, closeServer };