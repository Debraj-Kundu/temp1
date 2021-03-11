const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

//prototype error
const multipleMongooseToObj = (arrayOfMongooseDocuments) => {
  const tempArray = [];
  if (arrayOfMongooseDocuments.length !== 0) {
    arrayOfMongooseDocuments.forEach(doc => tempArray.push(doc.toObject()));
  }
  return tempArray;
};

const mongooseToObj = (doc) => { if (doc == null) { return null; } return doc.toObject(); };


router.get('/', (req, res) => {
  res.render('employee/addOrEdit', {
    viewTitle: "Insert Employee"
  });
});
router.get('/list', async (req, res) => {
  try {
    const user = mongooseToObj(await Employee.findOne({ email: req.body.email })); // Returns the same as user.toObject()
    const users = multipleMongooseToObj(await Employee.find()); // Return arrays where .toObject() was called on each document
    res.render('employee/list', {
      list: users
    });
  } catch (err) {
    console.log('Error: ' + err);
  }
});

router.post('/', (req, res) => {
  //console.log(req.body);
  insertRecord(req, res);
});

function insertRecord(req, res) {
  let employee = new Employee();
  employee.fullname = req.body.fullname;
  employee.email = req.body.email;
  employee.amount = req.body.amount;
  employee.address = req.body.address;
  employee.save((err, doc) => {
    if (!err)
      res.redirect('employee/list');
    else
      console.log('Error during record insertion: ' + err);
  });
}

router.get('/:id', async (req, res) => {
  try {
    const user = mongooseToObj(await Employee.findById(req.params.id)); // Returns the same as user.toObject()
    const users = multipleMongooseToObj(await Employee.find()); // Return arrays where .toObject() was called on each document
    //const employee = await Employee.findById(req.params.id);
    res.render('employee/addOrEdit', {
      viewTitle: 'Update Employee',
      employee: users
    });
  } catch (err) {
    console.log('Error: ' + err);
  }
});

module.exports = router;