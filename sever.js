const express = require('express')

const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const morgan = require('morgan');
const indexRoutes = require('./routes/index')
const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')
const Product = require('./model/product')
const User = require('./model/user')
const session = require('express-session')
const bodyParser = require('body-parser')
const  {signup, signin} = require('./controllers/auth.controllers.js') 
const app = express()




app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'));
app.use(express.static('views'))
app.use(express.static('uploads'))
app.set('layout', 'layout')
app.use(expressLayouts)
app.use(session({secret:'mySchool', resave: false, saveUninitialized: false}))
 
 

 

const dbURI='mongodb+srv://Munah:Muna08102@nodetest.57edd.mongodb.net/testUser?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( app.listen(3000, ()=>{
  console.log('connected to db and running')}))
.catch((err) => console.log(err));

/*
const Storage = multer.diskStorage({
  destination: "./public/uploads",
  filename:(req, file, cb)=>{
    cb(null, file, filename+"_"+Date.now()+path.extname(file.originalname))
  }
}
  )
  
  const upload = multer({storage: Storage}).single('file')


*/


app  .get('/adminP', (req, res) => {
  res.render('admin/create.ejs', {title: "admin panel "})
})



app.use('/', indexRoutes)
app.use('/product', productRoutes)
app.use('/user', userRoutes)


