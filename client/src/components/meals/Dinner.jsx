import React, {Fragment, useState} from "react";
import { IntakeInfoTable } from './IntakeInfo';

const Dinner = ({meals, day, updateDinner}) => {

    const [fname, setFood] = useState
    ("");

    const meal = "dinner";

    const onSubmitForm = async (e) =>{
        e.preventDefault();
        try{
            const body = {fname, meal, day};
            const response = await fetch("http://localhost:8000/dashboard/foodComp",
            {
                method: "POST",
                headers: {"Content-Type":"application/json", 
                jwt_token: localStorage.getItem("token")}, 
                body: JSON.stringify(body)
            }
            ).then(res=>{
                res.json().then(res=>{   
                    console.log(res);
                    updateDinner(prev => ({...prev , [meal]: [...prev[meal] , res] }))
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
        <h4 className="meal-text">Dinner </h4>
        <div  style={{alignItems:"baseline", textAlign:"center", width:"600px", marginTop:"-15px", marginLeft:"-30px"}}>
         <input 
         type="text" 
         placeholder="add to dinner" 
         className="form-control"
         value={fname}
         onChange ={e => setFood(e.target.value)}
         style={{width:"480px" , marginRight:"10px"}}
         />
         <button className="btn btn-primary custom-btn" onClick={onSubmitForm}>Add</button>
         </div>
         <div>
      
        <IntakeInfoTable  meals = {meals} mealType = {meal} updateInfo = {updateDinner}/>
        </div>
     </Fragment>
    );
 };


export default Dinner;
