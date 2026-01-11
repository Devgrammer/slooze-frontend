const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const app = express();
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const imgkitAuthRoutes = require('./routes/imgkitAuth.routes')
const cookieParser = require("cookie-parser")
const session = require("express-session")

connectToDb();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    secret: 'slooze-key', 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: process.env.NODE_ENV === 'production' } 
}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





app.get('/', (req, res)=>{
    res.send("Helllo World")
})

app.use('/', imgkitAuthRoutes)
app.use('/auth', userRoutes)
app.use('/products', productRoutes)


module.exports = app;