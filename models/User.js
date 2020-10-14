const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId : {
        type : String,
        requried : true
    },
    displayName : {
        type : String,
        requried : true
    },
    firstName : {
        type : String,
        requried : true
    },
    lastName : {
        type : String,
        requried : true
    },
    image : {
        type : String,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)
