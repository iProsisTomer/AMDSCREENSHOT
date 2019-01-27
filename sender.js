var request = require("request");
var urlencode = require("urlencode");
var options = {
  method: "POST",
  url: "http://35.156.190.99:6405/biprws/logon/long",
  headers: {
    "cache-control": "no-cache",
    authorization: "Basic Og==",
    accept: "application/json",
    "content-type": "application/xml"
  },
  body:
    '<attrs xmlns="http://www.sap.com/rws/bip"> \r\n  <attr name="userName" type="string">administrator</attr>\r\n  <attr name="password" type="string">iProsis!@3</attr>\r\n  <attr name="auth" type="string" possibilities="secEnterprise,secLDAP,secWinAD,secSAPR3">secEnterprise</attr>\r\n</attrs>'
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);
  var res = JSON.parse(body);
  var encodedToken = urlencode.encode(res.logonToken);
  //taking screenshot
  (async () => {
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 768 });
    var url =
      "http://35.156.190.99:8080/BOE/OpenDocument/opendoc/openDocument.jsp?sIDType=CUID&iDocID=AVlrB5MZHAVCiwZ9MIRnYwA&XSYSTEM=cuid:AVQWNcIb991BtxFsJXbcqQw&LANGUAGE=he&COUNTRY=IL&XLANGUAGE=he&XQUERY=IXPLORER2&token=" +
      encodedToken;
    await page.goto(url);
    await page.waitFor(10000);
    await page.screenshot({ path: "example5.png" });
    await browser.close();
  })();

  //sending email with the screenshot

  ("use strict");
  const nodemailer = require("nodemailer");
  var app = require("./app.js");
  var emailTo = app.email;

  console.log("Sending to your email");
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let account = await nodemailer.createTestAccount();
    var mailTo;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "tomiprosis@gmail.com", // generated ethereal user
        pass: "tmtm12!T" // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: "tomiprosis@gmail.com", // sender address
      to: emailTo, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<img  src='cid:unique@cid'>",
      attachments: [
        {
          filename: "example5.png",
          path: __dirname + "/example5.png",
          cid: "unique@cid"
        }
      ]

      // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
});
