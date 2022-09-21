const multer = require('multer')
const ApiError = require('../utils/ApiError')

/*const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/category')
    },
    filename: (req, file, cb) => {
        cb(null, `category-${uuidv4()}-${Date.now()}-${file.originalname}`)
    }
})
*/
exports.uploadSingleImage = (imageName) => {
    //to transfer image to buffer and put it in memory
    const memory = multer.memoryStorage()
    //ensure images only applied
    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        }
        else {
            cb(new ApiError('images only applied', 400), false)
        }
    }
    const upload = multer({ storage: memory, fileFilter: fileFilter })
    return upload.single(imageName)
}

