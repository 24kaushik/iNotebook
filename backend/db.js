const mongoose = require('mongoose');
require('dotenv').config();

const MONGO = process.env.MONGO;

const mongoURI = MONGO;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}

module.exports= connectToMongo
