const express = require("express");
const app = express();




const port = process.env.PORT; 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.listen(port, () => console.log("User Authetication"));
