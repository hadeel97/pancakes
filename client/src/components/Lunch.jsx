import React, {Fragment, useState} from "react";
import { IntakeInfoTable } from './IntakeInfo';

const Lunch = ({meals, day}) => {

    const [fname, setFood] = useState
    ("");
    console.log(fname)
    const meal = "lunch"
    const onSubmitForm = async (e) =>{
        e.preventDefault();
        try{
            const body = { fname, meal, day};
            const response = await fetch("http://localhost:8000/foodComp",{ 
                method: "POST",
                headers: {"Content-Type":"application/json"}, 
                body: JSON.stringify(body)
            }
            );
            console.log(response)
        }catch(err){
            console.error(err.message)
        }

    }

    return (
     <Fragment>
        <h4 className="meal-text">Lunch </h4>
        <form className="d-flex" onSubmit={onSubmitForm}>
         <input 
         type="text" 
         placeholder="add to lunch" 
         className="form-control"
         value={fname}
         onChange ={e => setFood(e.target.value)}
         />
         <button type="submit" className="btn btn-primary custom-btn">Add</button>
        </form>
        <IntakeInfoTable  meals = {meals}/>
     </Fragment>
    );
 };


export default Lunch;
