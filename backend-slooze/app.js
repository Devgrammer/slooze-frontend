const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const app = express();
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const cookieParser = require("cookie-parser")
const session = require("express-session")

connectToDb();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    secret: 'slooze-key', 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: process.env.NODE_ENV === 'production' } 
}))



app.get('/', (req, res)=>{
    res.send("Helllo World")
})

app.use('/users', userRoutes)


module.exports = app;