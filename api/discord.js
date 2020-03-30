const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const request = require("request");
const session = require('express-session')
const cookieParser = require('cookie-parser');
const router = express.Router();

const CLIENT_ID = process.env.CID;
const CLIENT_SECRET = process.env.SECRET;
const redirect = encodeURIComponent('https://rambin.tk/api/discord/callback')

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');


  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  let response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,{
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
    }
  });



  const json = await response.json();
  const resp = request({
    url: 'http://discordapp.com/api/users/@me',
    headers: {
       'Authorization': `Bearer ${json.access_token}`
    },
    rejectUnauthorized: false
  }, async function(err, resp, body) {
    if(err) {
      console.error(err);
    } else {
      let output = JSON.parse(body);
      res.cookie("access_token", json.access_token, { maxAge: 60 * 60 * 1000 * 24 * 7 }) // 30 * 60 * 1000
      //res.cookie("userID", output.id, { maxAge: 60 * 60 * 1000 * 24 * 7 })   

      res.redirect("/"); 
    }
  });

}));

module.exports = router;  