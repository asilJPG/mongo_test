const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const mainRouter = require("./routes/index.routes");
const PORT = config.get("port") || 3030;

const app = express();

app.use(express.json());
app.use(mainRouter);

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(PORT, () => {
      console.log(`server ${PORT}`);
    });
  } catch (error) {
    console.log("server error");
    console.log(error);
  }
}

start();
