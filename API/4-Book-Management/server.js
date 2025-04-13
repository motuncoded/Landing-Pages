import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
const port = 3000;

app.get("/hello", (req, res) => {
  res.send({ body: "Hello You!" });
});

app.listen(port, () => {
  console.log(`Server is runnng at ${port}`);
});
