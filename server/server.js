const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");



//middleware
app.use(cors())
app.use(express.json());

//ROUTES
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));



app.listen(8000, () => {
    console.log("server has started on port 8000")
});
