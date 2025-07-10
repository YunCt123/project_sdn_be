const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;
const connect = mongoose.connect(uri);

module.exports = connect