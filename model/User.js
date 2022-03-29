const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        require:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        require:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        require:true,
        min:6,
        max:1024
    }
},{timestamps:true});

const User = mongoose.model('User',UserSchema);

module.exports = User;


