const mongoose = require('mongoose')

const proudct = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [100, 'too max proudct title'],
        minLength: [5, 'too min proudct title'],
        trim: true
    },
    slug: {
        type: String,
        lowerCase: true
    },
    description: {
        type: String,
        minLength: [20, 'too min proudct description'],
        require: [true, 'description of proudct required']
    },
    quantity:
    {
        type: Number,
        require: [true, 'quantity of proudct required']
    },
    sold:
    {
        type: Number,
        default: 0
    },
    category:
    {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: [true, 'product must belong to category'],
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'Brands',
    },
    subCategory: [{
        type: mongoose.Types.ObjectId,
        ref: 'subCategory',
    }],
    price: {
        type: Number,
        max: [50000, 'too max length price'],
        required: [true, 'proudct price required'],
        trim: true
    },
    priceAfterDiscount:
    {
        type: Number,
    },
    color: [String],
    images: [String],
    coverImage:
    {
        type: String,
        reuired: [true, 'cover of proudct required']
    },
    averageRaiting:
    {
        type: Number,
        min: [1, 'raiting must be above or equal 1.0'],
        max: [5, 'raiting must be less than or equal 1.0']
    },
    countOfRaiting:
    {
        type: Number,
        default: 0
    }
}, { timestamps: true })
//Pre middleware gets executed before the operation happens.
//mongose midleware call every time found "find" &  not take arrow function
proudct.pre("find", function (next) {
    this.populate({ path: 'category', select: 'name -_id' })
    next()
})

module.exports = mongoose.model('Proudcts', proudct)