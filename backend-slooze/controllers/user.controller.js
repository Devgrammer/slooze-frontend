const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator');



module.exports.registerUser = async (req, res, next)=>{
const error = validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({error: error.array()})
}
const {name, email, password, role} = req.body;
const hashedPassword = await userModel.hashPassword(password);

const user = await userService.createUser({
    name,
    email,
    password: hashedPassword,
    role: role

});

const token = user.generateAuthToken();

res.status(201).json({token, user})

}


module.exports.loginUser = async (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
console.log('rew', req.body)
   const {email, password} = req.body;

   const user = await userModel.findOne({email}).select('+password');

   if(!user){
    return res.status(401).json({message:"Invald email or password"})
   }

   const isMatch = await user.comparePassword(password);

   if(!isMatch){
     return res.status(401).json({message: "Invalid email or password"})
   }

   const token = user.generateAuthToken();

   res.cookie('token', token)
   req.session.token = token ;
   req.session.user = user; 

   return res.status(201).json({token , user})


}

module.exports.getUserProfile=async (req,res,next)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    req.session.destroy()
    res.status(200).json({ message: "Logged out" })
}