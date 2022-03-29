const mongoose = require('mongoose');

const ProductsShema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    categories:{
        type:Array,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Products', ProductsShema);