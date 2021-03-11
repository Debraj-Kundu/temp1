const mongoose = require('mongoose');

const str = 'mongodb://localhost:27017/EmployeeDB';

mongoose.connect(str, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) { console.log('MongoDB connection success'); }
  else { console.log('MongoDB connection error: ' + err); }
});

require('./employee.model');