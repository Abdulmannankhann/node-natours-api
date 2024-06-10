const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //Activate in gmail "less secure app" option - for gmail only
  });

  //Define the email options
  const mailOptions = {
    from: 'Abdul Mannan Khan <hello@abdul.io>',
    to: options.email,
    subject: options.subject,
    text: options.text,
    //html
  };

  //Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail