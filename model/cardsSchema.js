const mongoose=require('mongoose');
const { number } = require('zod');


const card=new mongoose.Schema({
    link:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Card", card);
