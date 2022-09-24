const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");
const request = require('request');
const jwt = require("jsonwebtoken");

router.get("/", authorize, async(req, res) => {
    try {
        const user = await pool.query("SELECT appUsers.uname, foodComp.fname, foodComp.meal, foodComp.cal, foodComp.carb, foodComp.fat, foodComp.protein  FROM appUsers LEFT JOIN foodComp ON appUsers.id = foodComp.id WHERE appUsers.id = $1", [req.user.id]);
        res.json(user.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});




//adding a foodComp
router.post("/foodComp", authorize, async(req,res) => {
    try{
        
        const {fname, meal, day} = req.body;
        const user_id=  req.user.id
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
                "INSERT INTO foodComp (user_id, fname, meal, cal, carb, fat, protein, serving, day) VALUES($1,$2,$3,$4,$5,$6, $7, $8, $9) RETURNING *", [user_id, fname, meal, calories, carbohydrates_total_g,fat_total_g,protein_g, serving_size_g , day]);
            res.json(newfoodComp.rows[0]);
          });

    }catch(err){
        console.error(err.message);
    }
})


//get Cals
router.get("/foodcomp/totalcals", authorize, async(req, res)=>{

    try {

        const user_id = req.user.id; 
        const { day } = req.query;
        const totalCals = await pool.query("SELECT  SUM(foodComp.cal) as totalcals FROM foodComp WHERE user_id = $1 AND day=$2", [user_id, day])
        res.json(totalCals.rows);

    } catch (error) {
        console.error(error.message);
        
    }


})


//get foodComp
router.get("/foodcomp/getByUser", authorize, async(req, res) => {
    try{
        const {email}= req.query;
        const allFoodComps = await pool.query("SELECT * FROM foodComp WHERE email = $1", [email])
        res.json(allFoodComps.rows);
    }
    catch (err){
        console.error(err.message);
    }
});

//get breakfast/lunch/dinner 
router.get("/foodcomp/getByMeal", authorize, async(req, res) => {
    try{
        const {meal} = req.query;
        const allFoodComps = await pool.query("SELECT * FROM foodComp WHERE meal =$1", [meal] )
        res.json(allFoodComps.rows);
    }
    catch (err){
        console.error(err.message);
    }
});

router.put("/foodComp/:id", authorize, (req,res) =>{
 try {

    const serving = req.body.grams;
    const {id} = req.params;
    const user_id=  req.user.id;
    pool.query("SELECT * FROM foodComp WHERE id=$1 AND user_id=$2", [id, user_id]).then(async food=>{

    console.log(food.rows[0]);
    food = food.rows[0];
    const val = serving/food.serving;
    console.log(food);
    const update = await pool.query("UPDATE foodComp SET serving= $1, cal=$2, carb=$3, fat=$4, protein=$5 WHERE id=$6 AND user_id=$7", [serving, food.cal*val,food.carb*val, 
    food.fat*val,food.protein*val, id, user_id]);
    console.log(update);
    console.log(food);

    res.json(update);
    })   
    
 } catch (error) {
    console.error(error.message);
    
 }
});

//get breakfast/lunch/dinner using date
router.get("/foodComp", authorize, async(req, res) => {
    try{
        const {day} = req.query;
        
        const user_id=  req.user.id;
        
        const allFoodComps = await pool.query("SELECT * FROM foodComp WHERE day =$1 AND user_id=$2", [day, user_id])
        res.json(allFoodComps.rows);
    }
    catch (err){
        console.error(err.message);
    }
});

//delete foodComp
router.delete("/foodcomp/:id", authorize, async(req, res) => {
    try{
        const {id} = req.params;
        const user_id =  req.user.id;
        const deleteFoodComp = await pool.query("DELETE FROM foodComp WHERE id =$1 AND user_id = $2", [id, user_id]);

        if(deleteFoodComp.rows.length === 0){
            res.json("THIS IS NOT YOURS")
        }

        res.json("food component is deleted!")
    } 
    catch (err){
        console.error(err.message);
    }
});

module.exports = router;