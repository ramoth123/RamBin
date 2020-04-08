const r = require("express").Router();

const mongoose = require("mongoose");
const binModel = require("../../models/bin.js");

const bodyParser = require("body-parser"),
      urlencodedParser = bodyParser.urlencoded({ extended: false });
const { randomID } = require("ramfish-api");
const { languages } = require("../../languages/");
const { HTMLEscape, userAuthentication } = require("../../functions/")

const RateLimiter = require("express-rate-limit");
const limiter = RateLimiter({
  windowMs: 2 * 60 * 1000, //2 minutes
  max: 10, //max 10 every 5 minutes per IP
  message: "Too many bins created from this IP, please try again in a few"
});



//multibin home
r.get("/", (req, res) => {
  res.status(200).render("/app/views/multi", { languages: languages })
})


//multibin create
r.post("/", urlencodedParser, async (req, res) => {
  let id = randomID({ length: 11, input: "random" }).toLowerCase()
  let { code, code2, lang, lang2 } = req.body
  console.log(code)
  console.log(code2)
  console.log(lang)
  console.log(lang2)
  
  res.send("UNDER DEVELOPMENT")

  //middleware
  /*if(!code || !code2 || !code && !code2) return res.send("Please fill in some code!");
  if(!lang) lang = "text";
  if(!lang2) lang2 = "text"
  let parserCode = HTMLEscape(code)
  let parserCode2 = HTMLEscape(code2)

  //bin create
  const newBin = new binModel({
    "id": id,
    "code": parserCode,
    "code2": parserCode2,
    "lang": lang.toLowerCase(),
    "lang2": lang2.toLowerCase()
  })
  await newBin.save()
  
  for(let langg in languages) {
    if(langg.toUpperCase() === lang.toUpperCase()) {
      let l = languages[langg][0].split("|")[0]      
      await res.redirect(`/${id}.${l}`)
    }
  }*/
})







//export route(s)
module.exports = r