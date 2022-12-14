const jwt = require("jsonwebtoken");
require('dotenv').config();

 function jwtGenerator(id){
    const payload = {
        user: {
            id : id
        }
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "2hr"})
 }

module.exports = jwtGenerator;