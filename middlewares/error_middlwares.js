//global express error handling
const errorMiddelware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    if (process.env.NODE_ENV == "devolopment") {
        sendErrorForDev(err, res)
    }
    else {
        sendErrorForProd(err, res)
    }
}
//error handling for devolopment mode 
const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        message: err.message,
        error: err,
        stack: err.stack,
        status: err.status
    })
}

//error handling for production mode 
const sendErrorForProd = (err, res) => {
    return res.status(err.statusCode).json({
        message: err.message,
        status: err.status
    })
}
module.exports = errorMiddelware