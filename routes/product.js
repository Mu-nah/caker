const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../model/product') 
const multer = require('multer')
const upload = multer({dest: 'uploads/'});



const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads');
  },
  filename: function (req, file, callback) {
    callback(null, cb(null, file.fieldname + '-' + Date.now())
    )}  
  
});
  
 // const upload = multer({storage: Storage}).single('file')



router.get('/', (req, res)=>{
 Product.find().sort({createdAt:-1})
  .then((result)=>{
res.render('./shop/index', {title: 'Shopping Mall' , products: result})
  })
  .catch((err)=>{
    console.log(err)
  });
});



 
router.post('/', upload.single('image' ), (req, res) => {
  const products = new Product({
  image: req.body.image,
  title: req.body.title,
  description: req.body.description,
  price: req.body.price
    });
  products.save()
  .then((result) => {
    res.redirect('/product')
  })
  .catch((err)=> {
    console.log(err)
  })
})



module.exports = router