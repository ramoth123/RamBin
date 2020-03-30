const r = require("express").Router();

const mongoose = require("mongoose");
const binModel = require("../../models/bin.js");

const bodyParser = require("body-parser"),
      urlencodedParser = bodyParser.urlencoded({ extended: false });
const { randomID } = require("ramfish-api");
const { languages } = require("../../languages/");


//home
r.get("/", (req, res) => {
  res.status(200).render("/app/views", { languages: languages });
});


//bin create
r.post('/', urlencodedParser, async (req, res) => {
  let id = randomID({ length: 12, input: "random" }).toLowerCase()
  let code = req.body.code;
  let lang = req.body.lang;
  let time = req.body.time;

  //post middleware
  if(!code) return res.send("Please fill in some code!");
  if(!["7200000", "43200000", "86400000"].includes(time) || !time) time = "7200000";
  if(!lang) lang = "text";
  
  //bin create
  const newBin = new binModel({
    "id": id,
    "code": code,
    "lang": lang.toLowerCase()
  })
  await newBin.save()
  
  for(let langg in languages) {
    if(langg.toUpperCase() === lang.toUpperCase()) {
      let l = languages[langg][0].split("|")[0]      
      await res.redirect(`/${id}.${l}`)
    }
  }
});


//bin
r.get("/:id", async (req, res) => {
  let id = (req.params.id).split(".")[0]
    
  if(id) {
    const DB = await binModel.findOne({ id: id })
    if(DB) {
      res.status(200).render("/app/views/bin", { code: DB.code, lang: DB.lang, id: DB.id });
    } else {
      if(req.url === "/multi") {
        res.status(200).render("/app/views/multi", { languages: languages });
      } else {
        res.status(404).send({error_status: 404, error: "page not found", path: req.url}) 
      }
    } 
  }
})


//bin edit
/*r.get("/:id/edit", async (req, res) => {
  let id = req.params.id
  
  if(id) {
    const DB = await binModel.findOne({ id: id })
    if(DB) {
      res.status(200).render("/app/views/edit", { code: DB.code, lang: DB.lang, languages: languages })
    } else {
      res.status(404).send({error_status: 404, error: "page not found", path: req.url})
    }
  }
})*/





//export routes
module.exports = r