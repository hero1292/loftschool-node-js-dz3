const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'test@gmail.com',
    pass: 'test'
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;
