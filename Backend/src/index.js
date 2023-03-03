const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
});

app.listen(3333, () => console.log("Running application in port 3333 3333"));
