const mongoose = require('mongoose')

const categories = new mongoose.Schema({
    name:
    {
        type: String,
        required: [true, 'catgory required'],
        unique: [true, 'category must be unique'],
        minLength: [5, 'too short catgory'],
        maxLength: [35, 'tpp long category']
    },
    slug: {
        type: String,
        lowerCase: true
    },
    image: String
}, { timestamps: true })

module.exports = mongoose.model('Category', categories)