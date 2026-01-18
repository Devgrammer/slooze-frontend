const express = require("express");
const router = express.Router();
const productController = require('../controllers/products.controller');
const { body } = require("express-validator");
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware.authUser, productController.getAllProduct)
router.get('/:id', authMiddleware.authUser, productController.getProduct)
router.post('/add-product', [
    body('productName').notEmpty().withMessage("Product name not be empty")
], authMiddleware.authUser, productController.addProduct)

router.put('/update-product/:id', authMiddleware.authUser, productController.updateProduct)

router.delete('/delete-product/:id', authMiddleware.authUser, productController.deleteProduct)



module.exports = router;
