const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
const app = express();

// View engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("contact");
});
console.log("App Started");
app.post("/send", (req, res) => {
  var email = req.body.email;
  exports.email = email;

  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("resolved");
      }, 2000);
    });
  }

  async function asyncCall() {
    console.log("calling");
    var result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: 'resolved'
  }

  asyncCall();

  fs.readFile("./front.html", null, function(error, data) {
    if (error) {
      res.writeHead(404);
    } else {
      res.write(data);
    }

    res.end();
  });

  var run = require("./sender.js");
  // res.render("contact", { msg: "Email has been sent with your report" });
});

app.listen(3000, () => console.log("Server started..."));
