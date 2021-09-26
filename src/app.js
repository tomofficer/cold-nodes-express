//require express
const express = require('express');
const getZoos = require('./utils/getZoos');
const validateZip = require('./middleware/validateZip');

//use morgan middleware
// const morgan = require('morgan');

//app-level middleware
// app.use(morgan('dev'));

//create an express app
const app = express();


//ROUTING SECTION

//zoos all routing
app.get("/zoos/all", (req, res) => {
  
  //incoming admin parameter
  const admin = req.query.admin;
  
  //if admin, return list of all zoos
  if (admin === true) {
    const getAllZoos = getZoos('all').join('; ');
  res.send(`All zoos: ${getAllZoos}`);
  } 
  
  //if no admin, 
  else {
    res.send('You do not have access to that route.')
  }
});

//check matching routing
app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  
  res.send(`${zip} exists in our records.`);
});



//zoos routing
app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  
  const zoosForZip = getZoos(zip).join('; ')
  res.send(`${zip} zoos: ${zoosForZip}`);
});



//error handling
app.use((req, res, next) => {
    res.send('That route could not be found!');
});


//export the express app
module.exports = app;