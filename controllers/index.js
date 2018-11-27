const db = require('../database/config');
const transporter = require('../utils/mail');

exports.Index = async (req, res) => {
  const indexViewModel = {
    title: 'Home page',
    skills: db.get('skills').value(),
    products: db.get('products').value(),
    mail_status: req.flash('message_status')
  };
  await res.render('pages/index', indexViewModel);
};

exports.SendEmail = async (req, res) => {
  const mailOptions = {
    from: '<test@gmail.com>',
    to: 'test@gmail.com',
    subject: 'Новое сообщение',
    html: `
    <h2>Вам новое сообщение</h2>
    <h3>Детали сообщения:</h3>
    <ul>  
      <li>Имя: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Сообщение:</h3>
    <p>${req.body.message}</p>
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });

  req.flash('message_status', 'Message successfully sended!');
  await res.redirect('/#feedback-form');
};
