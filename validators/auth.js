const {check} = require ("express-validator");


const validatorLoginItem= [
  check("email").exists().notEmpty(), 
  check("password").exists().notEmpty(), 
];
const validatorRegisterItem= [
  check("name").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({min:8, max:15}),
  ];

 
  

module.exports = { validatorLoginItem, validatorRegisterItem}  