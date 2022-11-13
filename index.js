const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const validator=require("./utils/validator")




const app = express();




dotenv.config();


function init(params) {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on("connected", (err, res) => {
    console.log("Connected to database.");
 });
     mongoose.connection.on("error", (err) => {
     console.log("err", err);
});

}

init()

app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.listen(3000 , (err)=>{
    if (!err) {
        console.log("Listening on port 3000")
    }
})


app.use("/api/clothes", validator.verifyToken,  ClothesRoute);