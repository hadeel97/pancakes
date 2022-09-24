const express = require("express");
const pool = require("../db");
const router = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorize = require("../middleware/authorize"); 

//registering

router.post("/register", validInfo, async (req,res) =>{
    try {
        const {uname, email, age, gender, password} = req.body;
        //checking if the user already exists
        const user = await pool.query("SELECT * FROM appUsers WHERE email = $1",
         [email]);
        if(user.rows.length !== 0){
            return res.status(401).send("User already exists!");
        }

        //encrypting password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //put user in database 

        const newUser = await pool.query("INSERT INTO appUsers (uname, email,age,gender,password) VALUES ($1,$2,$3,$4,$5) RETURNING *", 
        [uname, email, age, gender, bcryptPassword]);

        const token = jwtGenerator(newUser.rows[0].id);
        res.json({token});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//login route

router.post("/login", validInfo, async(req, res)=>{
    try {
        //destructure request body
        const {email, password} = req.body;
        console.log(req.body);
        //check if user doesnot exist
        const user = await pool.query("SELECT * FROM appUsers WHERE LOWER(email) = $1", [email.toLowerCase()]);
        if (user.rows.length===0){
            res.status(401).send("Email or Password is incorrect");
        } else {
        //check if the correct password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword){
            res.status(401).send("Email or Password is incorrect");
        }else{
            const token = jwtGenerator(user.rows[0].id);
            res.json({token});

        }
    }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;