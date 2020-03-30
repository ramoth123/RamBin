const r = require("express").Router();

const mongoose = require("mongoose");
const binModel = require("../../models/bin.js");

const bodyParser = require("body-parser"),
      urlencodedParser = bodyParser.urlencoded({ extended: false });
const { randomID } = require("ramfish-api");
const { languages } = require("../../languages/");


//multibin home
r.get("/", (req, res) => {
  res.status(200).render("/app/views/multi/", { languages: languages })
})


//multibin create
r.post("/", urlencodedParser, async (req, res) => {
  let accessToken = req.cookies["access_token"];
  let code = req.body.code;
  let code2 = req.body.code2;
  let lang = req.body.lang;
  let time = req.body.time;

  //middleware
  if(!code || !code2 || !code && !code2) return res.send("Please fill in some code!");
  if(!["7200000", "43200000", "86400000"].includes(time) || !time) time = "7200000";
  if(!lang) lang = "text";

  let id = randomID({ length: 11, input: "random" }).toLowerCase()
  
  //create multibin here
})







//export routes
module.exports = r