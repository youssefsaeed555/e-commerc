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

//return full url after initalize in the respone without change image in db
const setImageUrl = function (doc) {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/brand/${doc.image}`
        doc.image = imageUrl
    }
}
//post middleware gets executed after the operation happens.
//that work with find, findOne, update
brands.post('init', (doc) => {
    setImageUrl(doc)
})

//that work with create
brands.post('save', (doc) => {
    setImageUrl(doc)
})


module.exports = mongoose.model('Brands', brands)