const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  "userID": { type: String, required: false },
  "id": String,
  "code": String,
  "code2": { type: String, required: false },
  "lang": String,
  "createdAt": { type: Number, default: Date.now() }
  
}, { collection: 'bins' });

Schema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 }); //NOT WORKING, DOESN'T DELETE THE DOCUMENT AFTER THE SELECTED EXPIREAFTERSECONDS, PLEASE DM ME AT ramoth#3515
const model = mongoose.model('bins', Schema)
module.exports = model