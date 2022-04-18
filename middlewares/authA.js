const User = require('../model/user')

exports.authPage = async (permission)=>{
  const user = await User.findOne({email})
  return(req, res, next) =>{
    const userRole = user.role
    if(permission.includes(userRole)){
      next()
    }
  else {
    return res.json("you don't have permission")}
}}
