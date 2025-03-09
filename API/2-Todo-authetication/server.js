const express = require("express");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectdb = require("./config/dbController");
const taskRouter = require("./routes/taskRouter");
const app = express();

require("dotenv").config();

connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", taskRouter);

const port = process.env.PORT;

app.listen(port, () => console.log("User Authetication"));
