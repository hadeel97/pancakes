const jwt = require("jsonwebtoken");
require("dotenv").config() 

module.exports = function(req , res, next) {

        const token = req.header("jwt_token");
       
        if(!token){
           
            return res.status(403).json({msg: "Authorization denied"});
        } 
        
        try{
            const verify = jwt.verify(token, process.env.jwtSecret);
            req.user = verify.user;
            return next();
        }
        catch (err) {
            console.error(err.message)
            return res.status(401).json({msg: "Not valid Token"});    
    }

}