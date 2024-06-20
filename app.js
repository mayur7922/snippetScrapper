const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const router = require("./routes/router");
const port = 5000 ;

//middlewares
app.use(express.json());
require("dotenv").config()
//routes
app.use("/api/v1/", router);

const start = async() => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log("Server is listening on port " + port);
        });
    } catch (error) {
        console.log(error);
    }
}

start();