const express = require("express");
const userRouter = require("./router/userRouter.js");
const bookRouter = require("./router/bookRouter.js");
const categoryRouter = require("./router/categoryRouter.js")
const connectdb = require("./config/dbController");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
const cors = require("cors");
require("dotenv").config();

connectdb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 3000;
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", categoryRouter);


app.listen(port, () => {
  console.log(`Book Management API is running at ${port}`);
});
