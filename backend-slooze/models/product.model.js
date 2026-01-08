const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, `Product name is required`],
        trime: true,
        minlength: [3, 'Product name must be at least 3 characters'],
        maxlength: [200, 'Product name cannot exceed 200 characters']
    },
    productCategory: {
        type: String,
        required: [true, 'Product category is required'],
        trim: true,
        lowercase: true,
        enum: {
            values: ['electronics', 'clothing', 'home', 'books', 'beauty', 'sports', 'toys', 'automotive', 'food', 'other'],
            message: '{VALUE} is not a valid category'
        },
    },
        productDescription: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true,
            minlength: [10, 'Description must be at least 10 characters'],
            maxlength: [2000, 'Description cannot exceed 2000 characters']
        },
        productKeyword: {
            type: [String],
            required: [true, 'At least one keyword is required'],
            validate: {
                validator: function (keywords) {
                    return keywords.length > 0 && keywords.length <= 15;
                },
                message: 'Please provide 1 to 15 keywords'
            },
            default: []
        },
        productPrice: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price cannot be negative'],
            get: function (price) {
                return parseFloat(price.toFixed(2));
            },
            set: function (price) {
                return parseFloat(price.toFixed(2));
            }
        },
        productDiscount: {
            type: Number,
            min: [0, 'Discount cannot be negative'],
            max: [100, 'Discount cannot exceed 100%'],
            default: 0
        },
        productDiscountCategory: {
            type: String,
            enum: ['seasonal', 'flash_sale', 'clearance', 'member_only', 'holiday', 'none'],
            default: 'none'
        },
        productThumbnail: {
            type: String,
            required: [true, 'Product thumbnail is required'],
            validate: {
                validator: function (url) {
                    // Simple URL validation for images
                    return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i.test(url);
                },
                message: 'Please provide a valid image URL (png, jpg, jpeg, gif, webp, svg)'
            }
        },
        productPreview: {
            type: [String],
            validate: {
                validator: function (images) {
                    // Allow up to 10 preview images
                    return images.length <= 10;
                },
                message: 'Maximum 10 preview images allowed'
            },
            default: []
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'User ID is required'],
            index: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    })

    const productModel = mongoose.model('product', productSchema)

    module.exports = productModel