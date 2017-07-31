const bodyParser    = require('body-parser'),
    
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    express         = require('express'),
    app             = express(),
    passport        = require('passport'),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Blog            = require("./models/blogSchemes");

const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const config = require('./config');

const { DATABASE_URL, PORT } = config;


// App configuration
//app.use(morgan('common'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


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

//Middleware to check if user is logged in. Runs on every route
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//Telling server.js to use RESTful routes
app.use(blogRoutes);
app.use(authRoutes);

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
module.exports = { app, server, runServer, closeServer};