const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/register',[
    body('email').isEmail().withMessage("Invalid email or password"),
    body('name').notEmpty().trim(),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 charcters long")
], userController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid email or password"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 charcters long")
], userController.loginUser)

router.get('/profile', [
    body('email').isEmail().withMessage("Invalid email or password"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 charcters long")
],authMiddleware.authUser, userController.getUserProfile)

router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router;