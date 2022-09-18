const mongoose = require('mongoose')

const subCategories = new mongoose.Schema({
    name:
    {
        type: String,
        required: [true, 'catgory required'],
        unique: [true, 'category must be unique'],
        trim: true,
        minLength: [5, 'too short catgory'],
        maxLength: [35, 'tpp long category']
    },
    slug: {
        type: String,
        lowerCase: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: [true, 'subcategory must belongs to maiin category']
    }
}, { timestamps: true })

module.exports = mongoose.model('subCategory', subCategories)