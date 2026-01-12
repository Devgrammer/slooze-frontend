const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true,
   },
    email: {
        type:String,
        required: true,
        unique:true,
        minlength: [5, 'Email must be at least 5 characters long'],
    }, 
    password: {
        type: String,
        required: true,
        select:false
    },
    role: { // A single role field using an enum for defined roles
        type: String,
        enum: ["user", "manager"],
        default:"user",
    },
})

userSchema.methods.generateAuthToken= function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword =  async function(password){
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;



