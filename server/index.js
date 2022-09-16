const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const request = require('request');

//middleware
app.use(cors())
app.use(express.json());



//ROUTES
//adding a foodComp
app.post("/foodComp", async(req,res) => {
    try{
        const date = new Date();
        const {fname, meal} = req.body;
        email = "hadilemah@icloud.com"
       request.get({
            url: 'https://api.calorieninjas.com/v1/nutrition?query='+ fname,
            headers: {
              'X-Api-Key': 'xEHL/Nh23cEmd23+G80dww==85gZaw0KsZv9aSCA'
            },
          },
          async function(error, response, body) {
            const item = JSON.parse(body).items[0]

        console.log(item)
            var {sugar_g,fiber_g,serving_size_g,sodium_mg,name,potassium_mg,fat_saturated_g,fat_total_g,calories,cholesterol_mg,protein_g,carbohydrates_total_g} = item;
            const newfoodComp = await pool.query(
                "INSERT INTO foodComp (email, fname, meal, cal, carb, fat, protein, day) VALUES($1,$2,$3,$4,$5,$6, $7, $8)", [email, fname, meal, calories, carbohydrates_total_g,fat_total_g,protein_g,date]);
            res.json(newfoodComp);
          });

    }catch(err){
        console.error(err.message);
    }
})
//get foodComp by meal type & usr email 
app.get("/foodComp", async(req, res) => {
    try{
        const allFoodComps = await pool.query("SELECT * FROM foodComp")
        res.json(allFoodComps.rows);
    }
    catch (err){
        console.error(err.message);
    }
});
//get breakfast/lunch/dinner 
app.get("/foodComp/:meal", async(req, res) => {
    try{
        const {meal} = req.params;
        const allFoodComps = await pool.query("SELECT * FROM foodComp WHERE meal =$1 ", [meal] )
        res.json(allFoodComps.rows);
    }
    catch (err){
        console.error(err.message);
    }
});

//delete foodComp
app.delete("/foodComp/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const deleteFoodComp = await pool.query("DELETE FROM foodComp WHERE fid =$1 ", [id] )
        res.json("foodComp is deleted");
    }
    catch (err){
        console.error(err.message);
    }
});


//create User
app.post("/appUsers", async(req,res) => {
    try{

        const {email, uname, age, gender, password} = req.body;
        const date = new Date();
        const newUser = await pool.query(
            "INSERT INTO appUsers (email, uname, age, gender, password, created_on) VALUES($1,$2,$3,$4,$5,$6)", [email, uname, age, gender, password, date]);
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
