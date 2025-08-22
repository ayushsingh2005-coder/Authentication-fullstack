const userModel = require('../models/user.model.js');

// this function only create the user
module.exports.createUser = async ({
    firstname , lastname , email ,password
})=>{
    if(!firstname || !email || !password){
        throw new Error ( 'All fields are required');
    }
    
    // Check if user already exists
      const existing = await userModel.findOne({ email });
      if (existing) throw new Error('User already exists');
      
    // Create and save the new user
    const user = await userModel.create({
        fullname:{
            firstname , 
            lastname
        },
        email ,
        password
    })

    return user ;
}