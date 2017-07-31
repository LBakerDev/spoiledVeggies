const mongoose = require("mongoose");
// passportLocal plugin
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema ({

    username: String,
    password: String

});

// adds plugins and methods to user model
UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);