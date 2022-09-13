const mongoose = require('mongoose')
const db_connection = () => {

    mongoose.connect(process.env.DB_URL)
        .then((con) => {
            console.log(`connect successfuly at : ${con.connection.host}`)
        })
}

module.exports = db_connection