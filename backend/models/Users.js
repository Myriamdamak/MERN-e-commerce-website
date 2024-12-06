const {request}=require("express");
const mongoose = require('mongoose');
const bcrypt=require("bcryptjs")
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        },
        
    email: {
        type: String,
        unique:true,
        required: true,
        },


    password: {
        type: String,
        required: true
        },

    role: {
        
        type: String,
        enum: ['user', 'admin'], 
        default: 'user' 
        },

},
{timestamps:true}
);
module.exports=mongoose.model('user',userSchema)