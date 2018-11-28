const db = require('../database/config');

exports.Admin = async (req, res) => {
  const adminViewModel = {
    title: 'Admin page',
    skills: db.get('skills').value(),
    msgskill: req.flash('msgskill'),
    msgfile: req.flash('msgfile')
  };
  await res.render('pages/admin', adminViewModel);
};

exports.AddProduct = async (req, res) => {
  const newProduct = {
    src: `./assets/img/products/${req.file.filename}`,
    name: req.body.name,
    price: parseInt(req.body.price)
  };

  db.get('products')
    .push(newProduct)
    .write();

  req.flash('msgfile', 'Product successfully created!');
  await res.redirect('/admin');
};

exports.AddSkills = async (req, res) => {
  const skills = [
    { name: 'age', value: parseInt(req.body.age) || 0 },
    { name: 'concerts', value: parseInt(req.body.concerts) || 0 },
    { name: 'cities', value: parseInt(req.body.cities) || 0 },
    { name: 'year', value: parseInt(req.body.years) || 0 }
  ];
  skills.forEach(skill => {
    db.get('skills')
      .find({ name: skill.name })
      .assign({ value: skill.value })
      .write();
  });
  req.flash('msgskill', 'Skill values successfully updated!');
  await res.redirect('/admin');
};
