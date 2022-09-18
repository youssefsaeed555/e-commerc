const mongoose = require('mongoose')

const dbConnection = () => {

    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: "true" })
        .then((con) => {
            console.log(`connect successfuly at : ${con.connection.host}`)
        })
}

module.exports = dbConnection