let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    username:
    {
        type:String,
        default:"",
        trim:true,
        required:'Username is required'
    },
    /*
    password:
    {
        type:String,
        default:"",
        trim:true,
        required:'Password is required'
    }*/
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required:'DisplayName is required'
    },
    created:{
        type:Date,
        default: Date.now
    },
    update:{
        type:Date,
        default: Date.now
    },
    githubId: {
        type:String
    },
    googleId: {
        type:String
    }
},
{
    collection: "users"
}
)

// configure options for user model
let options = ({MissingPasswordError:'Wrong/Missing Password'});
User.plugin(passportLocalMongoose, options);
module.exports = mongoose.model("User", User);