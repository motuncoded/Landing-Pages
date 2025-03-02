const express = require("express");
const userRouter = require("./routes/userRouter");
const connectdb = require("./db/dbController");
const err = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express(); // app middleware

const port = process.env.PORT; // port

connectdb(); //mongodb connection

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRouter);

app.use(err);

app.listen(port, () => console.log("User Authetication"));
