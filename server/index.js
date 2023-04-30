const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const connectDb = require("./config/db.js");
const port = process.env.PORT;
const { router } = require("./routes/users.js");
const movieRouter = require("./routes/movies.js");

const app = express();

app.use(express.json());
app.use(cors());

connectDb();

app.use("/users", router);
app.use("/movies", movieRouter);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})