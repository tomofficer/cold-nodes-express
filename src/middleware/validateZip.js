//import getZoos helper function
const getZoos = require("../utils/getZoos");

//router-leve middleware


function validateZip(req, res, next) {
  //incoming zip parameter
  let zip = req.params.zip;
  
  //verify numeric value and returns number or Nan if non-numeric
  const zipNum = Number(zip);
  
  //verify char length and numeric value
  if (zip.length != 5 || isNaN(zipNum)) res.send(`Zip (${zip}) is invalid!`);
  
  //verify given zoo from given zip exists in records
  if (!getZoos(zip)) {
    res.send(`${zip} does not exist in our records.`);
    
    //verify if the given zip code has zoos in the area
  } else if (getZoos(zip).length < 1) {
    res.send(`${zip} has no zoos.`);
  } 
  
    //if no errors move to next route
    else {
    next();
  }
}

module.exports = validateZip;