const jwt = require("jsonwebtoken")
const User = require('../model/user')


const API_SECRET = "am_just_trying"

const verifyToken = (req, res, next)=>{
  if(req.headers && req.headers.authorization && req.headers.authorization.split('')[0]==="JWT"){
    jwt.verify(req.headers.authorization.split('')[1], API_SECRET, function(err, decode){
      if(err) {req.user = undefined
      User.findOne({_id: decode.id})
      .exec((err, user) => {
        if(err){res.status(500).send({mesage: err})
      }else{
        req.user = user
        next() }}
      )
    }})
  }else{
    req.user = undefined
    next()
  }
}
module.exports = verifyToken;