const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const connectDB = mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

module.exports = connectDB;