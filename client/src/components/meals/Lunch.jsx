import React, {Fragment, useState} from "react";
import { IntakeInfoTable } from './IntakeInfo';

const Lunch = ({meals, day, updateLunch}) => {

    console.log(meals)
    const [fname, setFood] = useState
    ("");
    
    const meal = "lunch"
    const onSubmitForm = async (e) =>{
        e.preventDefault();
        try{
            const body = { fname, meal, day};
            const response = await fetch("http://localhost:8000/dashboard/foodComp",{ 
                method: "POST",
                headers: {"Content-Type":"application/json", 
                jwt_token: localStorage.getItem("token")},
                body: JSON.stringify(body)
            }
            ).then(res=>{
                res.json().then(res=>{   
                    console.log(res);

                    updateLunch(prev => ({...prev , [meal]: [...prev[meal] , res] }))
                    setFood("");}
                    
                )
              });

            console.log(response)
        }catch(err){
            console.error(err.message)
        }

    }

    return (
     <Fragment>
        <h4 className="meal-text">Lunch </h4>
        <div style={{alignItems:"baseline", textAlign:"center", width:"600px", marginTop:"-15px", marginLeft:"-30px"}}>
         <input 
         type="text" 
         placeholder="add to lunch" 
         className="form-control"
         value={fname}
         onChange ={e => setFood(e.target.value)}
         style={{width:"480px" , marginRight:"10px"}}
         />
         <button type="submit" className="btn btn-primary custom-btn" onClick={onSubmitForm}>Add</button>
         </div>
         <div>
  
        <IntakeInfoTable  meals = {meals} mealType = {meal} updateInfo = {updateLunch}/>
        </div>
     </Fragment>
    );
 };


export default Lunch;
