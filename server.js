//require packages
const express = require("express");
const fetch = require("node-fetch")
const cors = require("cors")
const http = require("http")
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xssFilter = require('x-xss-protection');
const { HTMLEscape } = require("./functions/")
const { languages } = require("./languages/")

const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@ramfish-bot-mgpji.mongodb.net/rambin?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })


//app init
const app = express();



//middleware
app.use(cookieParser());
app.use(cors())
app.use(helmet.xssFilter());
app.use(xssFilter());



//set/use statics
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");



//routes
app.use("/", require("./routes/base/"));;
app.use("/multi", require("./routes/multi/"));
app.use("/raw", require("./routes/api/raw/"));
app.use("/json", require("./routes/api/json/"));
app.use("/private", require("./routes/private/"));
//app.use("/api/discord", require("./api/discord"));











//listerer/starter
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});



//CPR
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
}, 280000)