 const productModel = require('../models/product.model')

 module.exports.addProduct = async({productName, productCategory, productDescription, productKeyword, productPrice, productDiscount, productDiscountCategory,productThumbnail, productPreview,user})=>{

     if (!productName || !productCategory || !productDescription || !productKeyword || !productPrice || !productDiscount || !productDiscountCategory || !productThumbnail || !productPreview || !user) {
         throw new Error('Al fields are required');
     }

     let newProduct={};
     newProduct={
         productName, productCategory, productDescription, productKeyword, productPrice, productDiscount, productDiscountCategory, productThumbnail, productPreview, user
     }

     const product = productModel.create(newProduct)

     return product;

 }