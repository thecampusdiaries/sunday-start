const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    pw: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows null values to not be unique
    },
    profile: {
        bio: {
            type: String,
            default: "-"
        },
        profileImage: {
            url: String,
            filename: String
        }
    }

})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
