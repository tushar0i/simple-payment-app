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

const accountSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    balance : {
        type: Number,
        // We Will store integer insted of float because if accuracy 
        // 8.95 -> will be stored as 895
        // 90 -> 9000
        required:true
    }
});

const User = mongoose.model("User",userSchema)
const Account = mongoose.model("Account",accountSchema)

module.exports = {
    User,
    Account
}