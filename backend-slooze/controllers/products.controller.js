const { validationResult } = require("express-validator")
const productService = require('../services/product.service')
const productModel = require('../models/product.model')

module.exports.addProduct = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { productName, productCategory, productDescription, productKeyword, productPrice, productDiscount, productDiscountCategory, productThumbnail, productPreview, user } = req.body
    const product = await productService.addProduct({
        productName, productCategory, productDescription, productKeyword, productPrice, productDiscount, productDiscountCategory, productThumbnail, productPreview, user
    })

    res.status(201).json({ product })
}

module.exports.updateProduct = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { id } = req.params;
    const userId = req.user._id;

    try {
        const product = await productModel.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found or unauthorized" })
        }



        const updateData = { ...req.body };
        updateData.updateAt = Date.now();



        const updatedProduct = await productModel.findOneAndUpdate(
            { _id: id, user: userId },
            updateData, {
            new: true,
            runValidators: true
        }
        );





        res.status(201).json({
            success: true,
            message: "Product Updated Successfully!",
            data: updatedProduct

        })
    } catch (error) {
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { id } = req.params;
    const userId = req.user._id;

    try {
        const product = await productModel.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found or unauthorized" })
        }


        res.status(201).json({
            success: true,
            message: "Product Deleted Successfully!",
            data: {
                id: id,
                name: product.productName
            }

        })
    } catch (error) {
        console.error('Delete error:', error);
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format',
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports.getProduct = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { id } = req.params;
    const userId = req.user._id;

    try {
        const product = await productModel.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found or unauthorized" })
        }

        res.status(201).json({
            success: true,
            message: "Product Updated Successfully!",
            data: product

        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.getAllProduct = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const userId = req.user._id;
    console.log('dd',userId)

    try {
        const products = await productModel.find({
            user: userId
        }).sort({ createdAt: -1 });;


        res.status(201).json({
            success: true,
            count: products.length,
            data: products

        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}