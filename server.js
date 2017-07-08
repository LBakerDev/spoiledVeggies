const bodyParser    = require('body-parser'),
morgan              = require('morgan'),git 
methodOverride      = require("method-override"),
mongoose            = require('mongoose'),
express             = require('express'),
app                 = express(),
Blog                = require("./models/blogSchemes");

const blogRoutes    = require("./routes/blog");
const config = require('./config');

const {DATABASE_URL, PORT} = config;


// App configuration
app.use(morgan('common'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(blogRoutes);

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
    console.log(databaseUrl, 'Server Running!');
    return new Promise((resolve, reject)=> {
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
        server.close(err =>{
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


module.exports = {app, server, runServer, closeServer};