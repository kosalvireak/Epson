const express = require('express');
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "x-auth-token, Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cors());

async function main() {
    try {
        await mongoose.connect(config.get("mongoURI"));
        console.log("Mongo connection Open");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
main();

app.use(express.urlencoded());
app.use(express.json());

app.use("/api/user", require("./routes/users"));
app.use("/api/flutter/user", require("./routes/flutter"));
app.use("/api/csv", require('./routes/csvs'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(config.get("PORT"), '0.0.0.0', () => {
    console.log("Listening at ports", config.get("PORT"));
});
