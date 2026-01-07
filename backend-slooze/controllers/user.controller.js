const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model')



module.exports.registerUser = async (req, res, next)=>{
const error = validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({error: error.array()})
}
const {name, email, password, role} = req.body;

const isUserAlreadyExist = await userModel.findOne({email});

if(isUserAlreadyExist){
    res.status(400).json({message:"User aleady exist"})
}
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
    const token = req.cookies.token || req.session.token || req.headers.Authorization?.split(' ')[1]
    await blacklistTokenModel.create({token});
    req.session.destroy()
    res.status(200).json({ message: "Logged out" })
}