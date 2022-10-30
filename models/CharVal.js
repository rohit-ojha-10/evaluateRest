const mongoose = require('mongoose')
const CharValSchema = new mongoose.Schema({
    A: {
        type: Number,
        required : true
    },
    B: {
        type: Number,
        required : true
        
    },
    C: {
        type: Number,
        required : true
    },
    D: {
        type: Number,
        required : true
    },
    E: {
        type: Number,
        required : true
    }
})
module.exports = mongoose.model('CharVal', CharValSchema)