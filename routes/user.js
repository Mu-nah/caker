const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/user') 
const verifyToken = require('../middlewares/authJWT.js')
const verifyAdmin = require('../middlewares/authA.js')
const  {signup, signin} = require('../controllers/auth.controllers.js')

/*const authPage = async (permission)=>{
  const user = await User.findOne({email})
  return(req, res, next) =>{
    const userRole = user.role
    if(permission.includes(userRole)){
      next()
    }
  else {
    return res.json("you don't have permission")}
}}
*/


router.get('/',(req, res) => {
  res.send('welcome')
})
router.post ('/', (req, res) => {
 res.send('hello  ' + req.body.first_name )
})

router.get('/register', (req, res) => {
  res.render('./user/signUp.ejs',{title: "cakelaw"})
})

router.post('/register', signup, (req, res) => {
  res.send('okay')
})

router.post('/login', signin, (req, res) => {
    res.send('okay '+ user.email )
})

router.get('/login', (req, res) => {
    res.render('./user/signIn.ejs',{title: "cakelaw"})
})

router.get('/admin',  (req, res) =>{
    res.render('./user/signIn.ejs',{title: "cakelaw"})
})

router.post('/admin', signin,  (req, res) =>{
    
})




module.exports = router