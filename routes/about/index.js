const r = require("express").Router();

const { userAuthentication, sendUserInfo } = require("../../functions/")



r.get("/", async (req, res) => {
  res.status(200).render("/app/views/about", { data: false })
})





//export route(s)
module.exports = r