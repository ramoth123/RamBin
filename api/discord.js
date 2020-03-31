const r = require('express').Router();
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const session = require('express-session');

const redir = encodeURIComponent(process.env.CALLBACK)



r.get("/callback", catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error("NoCodeProvided");

  const code = req.query.code;
  const creds = btoa(`${process.env.CID}:${process.env.SECRET}`);
  let response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redir}`,{
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
    }
  });

  
  const json = await response.json();
  await fetch("http://discordapp.com/api/users/@me", {
    method: "POST",
    headers: {
       "Authorization": `Bearer ${json.access_token}`
    },
    rejectUnauthorized: false
  })
  .then(res => res.json())
  .then(user => {
    req.session.accessToken = `${json.access_token}`      
    req.session.cookie.maxAge = 30 * 60 * 1000;

    res.redirect("/"); 
  })
  .catch(err => {
    console.log(err)
  })
}));



//export route(s)
module.exports = r;  