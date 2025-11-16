const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName : {
        type: String,
        required: true,
        trim: true,
        minLength:1 
    },
    lastName : {
        type: String,
        required: true,
        trim: true,
        minLength:1 
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase:true
    },
    password : {
        type:String,
        required:true,

    },
});

const userModel = mongoose.model("user",userSchema)

module.exports = {
    userModel,
}