const User = require('../model/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
//handle errors
const handleErrors = (err)=>{
    console.log(err.message,err.code)
    let errors = {}
      // incorrect username
  if (err.message === "incorrect username") {
    errors.username = "username is not registered";
  }
  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "password  is incorrect";
  }

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
const maxAge = "2h"
// create a token
 const createToken =  (id) => {
  return jwt.sign({id}, process.env.secret_key,{
    expiresIn : maxAge
  })
 }
const signup = (async(req,res)=>{
  const {firstname,lastname,email,username,password} = req.body;
  try {
    const user = await User.create({
        firstname,lastname,email,username,password}) 
    const token = createToken(user._id)
    res.status(201).json({ user: user._id,token});
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({errors})
  }
})
const login = (async(req,res)=>{
    const {email,password} = req.body;
    try {
      const user = await User.login(email,password)
      const token = createToken(user._id);
  
      res.status(200).json({ user:  user._id ,token})
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({errors})
    }
})
const logout = (req,res)=>{
  res.status(200).json({ message: 'Logout successful' });
}

module.exports = {signup,login,logout}