const fetch = require("node-fetch");

module.exports = {
  HTMLEscape(html) {
    return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/script/g, 'yougay').replace(/img/g, 'yougay').replace(/onerror/g, 'yougay')                                         
  },
  
  userAuthentication(req, res, next) {
    if(req.session.accessToken) {
      fetch('https://discordapp.com/api/users/@me', {
        method: 'get',
        body:    null,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + req.session.accessToken },
      })
      .then(res => res.json())
      .then(user => {
        if(!user) {
          return res.redirect("/")
        }
        res.locals.user = user;
        next()
      })
    } else {
      return res.redirect("/")
    }
  }
}