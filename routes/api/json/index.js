const r = require("express").Router();

const mongoose = require("mongoose");
const binModel = require("../../../models/bin.js");



r.get("/:id", async (req, res) => {
  let id = (req.params.id).split(".")[0]
    
  const DB = await binModel.findOne({ id: id })
  if(DB) {
    res.json({
      id: DB.id,
      code: DB.code,
      lang: DB.lang,
      created: DB.created
      }) 
  } else {
    res.redirect("/")
  }
})


//create /api/create and /api/create/multi





//export routes
module.exports = r