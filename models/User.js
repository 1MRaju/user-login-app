const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: true,
        required: true,
    },
    email:{
        type:String,
        unique: true,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
      },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default : Date.now(),
    }
})

module.exports = new mongoose.model('User', userSchema);