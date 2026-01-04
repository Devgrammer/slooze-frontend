const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const userController = require('../controllers/user.controller')


router.post('/register',[
    body('email').isEmail().withMessage("Invalid email or password"),
    body('name').notEmpty().trim(),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 charcters long")
], userController.registerUser)

module.exports = router;