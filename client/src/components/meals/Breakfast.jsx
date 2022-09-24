import React, {useState, Fragment } from 'react';
import { IntakeInfoTable } from './IntakeInfo';

  
const Breakfast = ({meals, day, updateBreakfast}) => {


    const [fname, setFood] = useState
    ("");
    
    const meal = "breakfast";
    
    const onSubmitForm = async (e) =>{
        e.preventDefault();
        try{
            const body = {fname, meal, day};
            await fetch("http://localhost:8000/dashboard/foodComp",
            {
                method: "POST",
                headers: {"Content-Type":"application/json", 
                jwt_token: localStorage.getItem("token")}, 
                body: JSON.stringify(body)

            }
            ).then(res=>{
                res.json().then(res=>{   
                    console.log(res);
                    updateBreakfast(prev => ({...prev , [meal]: [...prev[meal] , res] }))
                    setFood("");
                }                  
                )
            });

        }catch(err){
            console.error(err.message)
        }

    }

    return (

     <Fragment>
        <h4 className="meal-text">Breakfast</h4>
        <div style={{alignItems:"baseline", textAlign:"center", width:"600px" , marginTop:"-10px", marginLeft:"-30px"}}>
         <input 
         type="text" 
         placeholder="add to breakfast" 
         className="form-control"
         value={fname}
         onChange ={e => setFood(e.target.value)}
         style={{width:"480px" , marginRight:"10px"}}
         />
         <button className="btn btn-primary custom-btn" onClick={onSubmitForm}>Add</button>
         </div>
        <div>
        <IntakeInfoTable  meals = {meals} mealType={meal} updateInfo = {updateBreakfast}/>
        
       </div>
     </Fragment>
     
    );
 };

export default Breakfast;
