const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const request = require('request');

//middleware
app.use(cors())
app.use(express.json());


var va = {}; 

// function resultQ(query){
//     va = request.get({
//         url: 'https://api.calorieninjas.com/v1/nutrition?query='+ query,
//         headers: {
//           'X-Api-Key': 'xEHL/Nh23cEmd23+G80dww==85gZaw0KsZv9aSCA'
//         },
//       }, 
//       function(error, response, body) {
//         if(error) return console.error('Request failed:', error);
//         else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
//         else
//          va = body.substring(11,266)
//       });
// }

//ROUTES

app.post("/foodComp", async(req,res) => {
    try{
        const date = new Date();
        const {fname} = req.body;
        email = "hadilemah@icloud.com"
        var {ab,bla,wtv,bll,htg,ht,brh, fat, cal, wtvs,protein, carbs} = request.get({
            url: 'https://api.calorieninjas.com/v1/nutrition?query='+ fname,
            headers: {
              'X-Api-Key': 'xEHL/Nh23cEmd23+G80dww==85gZaw0KsZv9aSCA'
            },
          }, 
          function(error, response, body) {
            if(error) return console.error('Request failed:', error);
            else 
            if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else console.log(body.substring(11,266))
          });
    
        const newfoodComp = await pool.query(
            `INSERT INTO foodComp (email, fname, cal, carb, fat, protein, day) VALUES(${email},${fname},${cal},${carbs},${fat},${protein}, ${date})`, [email, fname, cal, carbs, fat, protein,date]);
        res.json(newfoodComp);    

    }catch(err){
        console.error(err.message);
    }
})
//get foodComp
//update foodComp
//get a foodComp
//delete foodComp


//create User
app.post("/appUsers", async(req,res) => {
    try{

        const {email, uname, age, gender, password} = req.body;
        const date = new Date();
        const newUser = await pool.query(
            `INSERT INTO appUsers (email, uname, age, gender, password, created_on) VALUES(${email},${uname},${age},${gender},${password},${date})`, [email, uname, age, gender, password, date]);
        res.json(newUser);  

    }catch(err){
        console.error(err.message);
    }

})
//get User with email & pw
//delete User
//update User


app.listen(8000, () => {
    console.log("server has started on port 8000")
});
