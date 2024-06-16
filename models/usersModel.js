const mongoose = require('mongoose');


const userSChema = new mongoose.Schema({
    email:String,
    password:String
})


module.exports = mongoose.model('user',userSChema);