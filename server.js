//require packages
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xssFilter = require('x-xss-protection');

const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@ramfish-bot-mgpji.mongodb.net/rambin?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })


//app init
const app = express();



//middleware
app.set('trust proxy', 1) //trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(cookieParser());
app.use(cors())
app.use(helmet.xssFilter());
app.use(xssFilter());



//set/use statics
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");



//routes
app.use("/", require("./routes/base/"));
app.use("/about", require("./routes/about/"));
app.use("/multi", require("./routes/multi/"));
app.use("/raw", require("./routes/api/raw/"));
app.use("/json", require("./routes/api/json/"));
app.use("/me", require("./routes/user/"));
app.use("/private", require("./routes/private/"));
app.use("/api/discord", require("./api/discord.js"));











//listerer/starter
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});



//CPR
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
}, 280000)