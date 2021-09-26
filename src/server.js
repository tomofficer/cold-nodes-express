//require the express app from app.js
const app = require('./app');

//start your server
const { PORT 5000 } = process.env;


//this function runs when server starts
const listener = () => console.log(`Server is running on Port ${PORT}`);


//this method runs the server
app.listen(PORT, listener);