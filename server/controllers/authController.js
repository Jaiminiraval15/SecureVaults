const User = require('../model/User')
//handle errors
const handleErrors = (err)=>{
    console.log(err.message,err.code)
    let errors = {}
    // validation error
    if (err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
          });
    }
    //duplicate error
    if (err.code === 11000){
      errors.email = 'Email is already registered';
      return errors;
    }
    return errors;
}
const signup = (async(req,res)=>{
  const {firstname,lastname,email,username,password} = req.body;
  try {
    const user = await User.create({
        firstname,lastname,email,username,password
    }) 
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({errors})
  }
})
const login = (async(req,res)=>{
 
})
module.exports = {signup,login}