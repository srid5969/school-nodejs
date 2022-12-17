var nodemailer = require("nodemailer");

exports.sendMail = (async(email,link) => {
  console.log("Email\t", email, "Link\t", link);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "joshua@innovixtech.com",
      pass: "Iitc@1234",
    },
  });
  var mailOptions = {
    from: "fromaddress@innovixtech.com",
    to: email,
    subject: "Report downloading Link ....",
    text: link, //!link
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
})
