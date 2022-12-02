
require("dotenv").config();
const express = require("express");
const app = express();
const { connection } = require('./db/config');
const { Contactt } = require("./models/contactSchema");
require("./db/config");
const cors = require("cors");
const router = require("./Routes/contactRouter");
const jwt = require("jsonwebtoken");
const jwt_Secret = "abccgghhh";

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(router);
const port = 8000;


app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});



