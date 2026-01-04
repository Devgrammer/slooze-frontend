const userModel = require('../models/user.model')

module.exports.createUser = async({name, email, password, role})=>{

    if(!name || !email || !password){
        throw new Error('Al fields are required');
    }
    let newUser={};
    if(role){
        newUser = {
            name,
            email,
            password,
            role
        }

    }else{
        newUser = {
            name,
            email,
            password,
        }
    }
    const user = userModel.create(newUser)

    return user;

}