const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./database/db.json');
const db = low(adapter);

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createID = require('../../utils/createID');
const config = require('./config');

exports.Auth = (req, res) => {
  const loginViewModel = {
    title: 'Login page'
  };
  res.render('pages/login', loginViewModel);
};

exports.Registration = (req, res) => {
  const registerViewModel = {
    title: 'Registration page'
  };
  res.render('pages/register', registerViewModel);
};

exports.Register = (req, res) => {
  const userId = createID();
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  db.get('users')
    .push({
      id: `_${userId}`,
      email: req.body.email,
      password: hashedPassword
    })
    .write();

  const token = jwt.sign(
    { id: userId },
    config.secret,
    { expiresIn: config.tokenLife }
  );
  res.status(200).send({ auth: true, token: token });
};

exports.Login = (req, res) => {
  const user = db.get('users')
    .find({ email: req.body.email })
    .value();

  if (!user) { res.status(404).render('User is not found!'); }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) { return res.status(401).render('Incorrect password!'); }

  const token = jwt.sign(
    { id: user.id },
    config.secret,
    { expiresIn: config.tokenLife }
  );

  res.status(200).send({ auth: true, token: token });
};
