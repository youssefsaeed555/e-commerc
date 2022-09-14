const mongoose = require('mongoose')

const brands = new mongoose.Schema({
    name:
    {
        type: String,
        required: [true, 'brand required'],
        unique: [true, 'brand must be unique'],
        minLength: [5, 'too short brand'],
        maxLength: [35, 'tpp long brand']
    },
    slug: {
        type: String,
        lowerCase: true
    },
    image: String
}, { timestamps: true })

module.exports = mongoose.model('Brands', brands)