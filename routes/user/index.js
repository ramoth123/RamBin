const r = require("express").Router();

const mongoose = require("mongoose");
const binModel = require("../../models/bin.js");

const bodyParser = require("body-parser"),
      urlencodedParser = bodyParser.urlencoded({ extended: false });
const { randomID } = require("ramfish-api");
const { languages } = require("../../languages/");
const { userAuthentication, sendUserInfo } = require("../../functions/")



r.get("/login", (req, res) => {
  const redir = encodeURIComponent(process.env.CALLBACK)
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CID}&scope=identify&response_type=code&redirect_uri=${redir}`);
});



r.get("/profile", userAuthentication, (req, res) => {
  res.send(res.locals.user)
})



//export route(s)
module.exports = r