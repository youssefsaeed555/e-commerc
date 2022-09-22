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

const imageURl = (doc) => {
    if (doc.image) {
        const imageurl = `${process.env.BASE_URL}/category/${doc.image}`
        doc.image = imageurl
    }

}
//work with find,findOne,update 
categories.post('init', (doc) => {
    imageURl(doc)
})
//work with create
categories.post('save', (doc) => {
    imageURl(doc)
})

module.exports = mongoose.model('Category', categories)