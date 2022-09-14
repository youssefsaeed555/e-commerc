//create express app
const express = require('express')

const app = express()

//config environment
require('dotenv').config()

//logger request
const morgan = require('morgan')

//ApiError handler
const ApiError = require('./utils/ApiError')

//global Error Handling
const globalError = require('./middlewares/error_middlwares')

//routes
const category = require('./routes/category_routes')
const subCategory = require('./routes/sub_category')


//db coonection 
const dbConnection = require('./config/database')

dbConnection()

//parse body
app.use(express.json())

//mount routes
app.use('/api/v1/categories', category)
app.use('/api/v1/subCategories', subCategory)


if (process.env.NODE_ENV === "devolopment") {
    app.use(morgan('dev'))
}

// handling unexist route
app.all('*', (req, res, next) => {
    next(new ApiError(`can't found this route: ${req.originalUrl}`, 400))
})


//global express error handling for express
app.use(globalError)

const server = app.listen(process.env.port || 3000,
    () => console.log(`app running in ${process.env.NODE_ENV} `))


//handling rjection out express
//listen for unhandledRejection such DB conn or validation 

process.on("unhandledRejection", (err) => {
    console.log(`unhandledRejection ${err.name} | ${err.message}`)
    server.close(() => {
        console.log(`server closed ...`)
        process.exit(1)
    })
})