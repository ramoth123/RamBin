const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  "userID": { type: String, required: false },
  "id": String,
  "code": String,
  "code2": { type: String, required: false },
  "lang": String,
  "lang2": { type: String, required: false },
  "createdAt": { type: Number, default: Date.now() }
  
}, { collection: 'bins' });

const model = mongoose.model('bins', Schema)
module.exports = model