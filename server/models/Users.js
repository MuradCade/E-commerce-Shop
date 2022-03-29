const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        min:5,
        max:8,
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:30,
    },isAdmin:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

module.exports = mongoose.model('Users', UserShema);