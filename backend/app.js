const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const mongo_url = process.env.MONGO_CONNECTION_URL;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error("Error in Db connection", err);
  });

/**
 * Middleware
 */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

app.listen(4000, () => {
  console.log("listning on port 4000", mongo_url);
});
