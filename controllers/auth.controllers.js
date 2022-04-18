const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')

const API_SECRET = "am_just_trying"

exports.signup = async (req, res)=>{
  try{
    const{first_name,last_name,email,password,location,contact, role} = req.body
  if(!email&&password&&first_name&&last_name&&location&&contact){
    res.send('All input is required')
  }
  const oldUser = await User.findOne({email})
  if(oldUser){
    res.send("User already exist. Please login")
    res.redirect('/login')
  }
  const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt) 
 const user = new User({
   first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    location: req.body.location,
    contact: req.body.contact,
     role:  req.body.role,
    password:hashedPassword})
    const token = jwt.sign({
      user_id: user._id, email}, API_SECRET, {expiresIn:"86700"}
     )
    user.token = token
    user.save();
    res.redirect('/')
  }
  catch(err){console.log(err)}
  /*console.log(req.body)
  try{
  const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt) 
 const users = new User({
   first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    location: req.body.location,
    contact: req.body.contact,
     role:  req.body.role ,
    password:hashedPassword
    })
    users.save()
    res.redirect('/login')
  }
  catch{
    res.redirect('./user/register')
  }*/
}

exports.signin = async (req, res, next)=>{
  
  try{
    const{email, password} = req.body;
    if(!email && password){
      res.send('All input is required')
    }
    const user = await User.findOne({email})
    if(user&&(await bcrypt.compare(password, user.password))){
      const token = jwt.sign({user_id: user._id, email}, API_SECRET, {expiresIn:"86700 "})
      user.token = token;
      if(user.role=="admin"){
        res.redirect('/adminP')
      }else{
        res.redirect('/')
      }
    }
    res.send('Invalid Credentials')
    res.redirect('/register')
  }
  catch(err){
    console.log(err)
  }
    /*try{
        const user = await User.findOne({email:req.body.email}) 
        if(user){
          const cmp = await bcrypt.compare(req.body.password, user.password)
          if(cmp) {
            res.redirect('/')
            const token = await jwt.sign({ id: user.id}, API_SECRET, { expiresIn: 86400})
             
        user:{id:user._id, email:user.email, first_name:user.first_name}, 
            accessToken:token
          }
          else{
            res.send("wrong username or password")
            accessToken: null
          }} 
        else{
          res.send("e no match")
        }
          }  catch(error){console.log(error)
        }*/
    
  } 
