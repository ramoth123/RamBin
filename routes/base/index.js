const r = require("express").Router();

const mongoose = require("mongoose");
const binModel = require("../../models/bin.js");

const bodyParser = require("body-parser"),
      urlencodedParser = bodyParser.urlencoded({ extended: false });
const { randomID } = require("ramfish-api");
const { languages } = require("../../languages/");
const { HTMLEscape, userAuthentication } = require("../../functions/")

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, //2 minutes
  max: 10, //limit each IP to 10 requests per ^
  message: "Too many requests, try again in a few!"
});


//home
r.get("/", async (req, res) => {
  res.status(200).render("/app/views", { languages: languages });
});


//bin create
r.post('/', limiter, urlencodedParser, async (req, res) => {
  let id = randomID({ length: 12, input: "random" }).toLowerCase()
  let { code, lang } = req.body

  //post middleware
  if(!code) return res.send("Please fill in some code!");
  if(!lang) lang = "text";
  let parserCode = HTMLEscape(code)
  
  //bin create
  const newBin = new binModel({
    "id": id,
    "code": parserCode,
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
        res.status(200).render("/app/views/multi/", { languages: languages });
      } else if(req.url === "/about") {
        res.status(200).render("/app/views/about/", { data: false });
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







//export route(s)
module.exports = r