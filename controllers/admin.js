const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./database/db.json');
const db = low(adapter);

const path = require('path');

exports.Admin = (req, res) => {
  const adminViewModel = {
    title: 'Admin page',
    skills: db.get('skills').value(),
    msgskill: req.flash('msgskill'),
    msgfile: req.flash('msgfile')
  };
  res.render('pages/admin', adminViewModel);
};

exports.AddProduct = (req, res) => {
  const newProduct = {
    src: path.join('./assets/img/products', req.file.filename),
    name: req.body.name,
    price: parseInt(req.body.price)
  };

  db.get('products')
    .push(newProduct)
    .write();

  req.flash('msgfile', 'Product successfully created!');
  res.redirect('/admin');
};

exports.AddSkills = (req, res) => {
  const skills = [
    { name: 'age', value: parseInt(req.body.age) || 0 },
    { name: 'concerts', value: parseInt(req.body.concerts) || 0 },
    { name: 'cities', value: parseInt(req.body.cities) || 0 },
    { name: 'year', value: parseInt(req.body.year) || 0 }
  ];
  skills.forEach(skill => {
    db.get('skills')
      .find({ name: skill.name })
      .assign({ value: skill.value })
      .write();
  });
  req.flash('msgskill', 'Skill values successfully updated!');
  res.redirect('/admin');
};
