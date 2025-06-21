const express = require("express");
const userRouter = require("./routes/userRouter");
const connectdb = require("./db/dbController");
const err = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
require("dotenv").config();
const app = express(); // app middleware

const port = process.env.PORT;

connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", userRouter);
// Error middleware
app.use(err);

app.listen(port, () =>
  console.log("Welcome to User Authentication, running on port", port),
);
