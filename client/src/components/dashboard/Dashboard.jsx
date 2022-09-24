import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from 'moment';
//components
import Breakast from "../meals/Breakfast";
import Lunch from "../meals/Lunch";
import Dinner from "../meals/Dinner";
import { DatePicker } from "antd";
import Title from "../Title";


const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [mealsFood,setMealsFood] = useState( {breakfast:[],lunch:[],dinner:[]} );  
  const [day, setDay] = useState(moment().format("L"));

  const [totalCals, setTotalCals]= useState({totalcals: "0"})
 

  useEffect(() => {
      getFoodData(day);
      getDailyIntake(day);
       },[day])

   

  const getDailyIntake = async(day) =>{
    try {
     const totalCals = await fetch(`http://localhost:8000/dashboard/foodcomp/totalcals?day=${day}`, {

        method: "GET",
          headers: {"Content-Type":"application/json", 
          jwt_token: localStorage.token  }

      })

      const totalCalories = totalCals;
      console.log(totalCalories);

      return (setTotalCals(totalCalories));
      
    } catch (error) {
      console.error(error.message)
    }
  }     
       
  const getFoodData = (day) =>{
     
    try{
      fetch(`http://localhost:8000/dashboard/foodComp?day=${day}`,
      {
          method: "GET",
          headers: {"Content-Type":"application/json", 
          jwt_token: localStorage.token }

      }
      ).then((res)=> res.json()).then(data => {
        console.log(data)
        const breakfast = data.filter(m => m.meal === "breakfast")
        const lunch = data.filter(m => m.meal === "lunch")
        const dinner = data.filter(m => m.meal === "dinner")
        setMealsFood({breakfast:breakfast,lunch:lunch,dinner:dinner})
      }
      )
     
  } catch(err){
      console.error(err.message)
  }
};

  const getProfile = async () => {

    try {

       const res = await fetch("http://localhost:8000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData[0].uname);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  });


  return (
    <div>
       <Title/>


       <button onClick={e => logout(e)} className="btn btn-primary custom-btn2" 
       style={{marginLeft:"27px", marginTop:"-75px", width:"80px", height:"30px", padding:"1px"}}>
          Sign Out
        </button>
      <div className="d-flex mt-5 justify-content-around">
        <h2 className="landing-text" style={{fontSize:"20px", marginTop:"-40px"}}>Hello {name}, Happy Tracking ♥</h2>
      </div>
      {/* <div className="d-flex mt-5 justify-content-around">
        <h2 className="landing-text" style={{fontSize:"20px", marginTop:"-40px"}}>Hello {totalCals}, Happy Tracking ♥</h2>
      </div> */}
      
      <div>
        
      <div className="container"> 
         <DatePicker style={{float: "right", marginTop:"-7.8em"}} defaultValue={moment()} onChange = { (day) => {setDay(day.format("L"))}}></DatePicker>
         <Breakast meals = {mealsFood.breakfast} day = {day} updateBreakfast = {setMealsFood}/>
         <Lunch meals = {mealsFood.lunch} day = {day} updateLunch = {setMealsFood}/>
         <Dinner meals = {mealsFood.dinner} day = {day} updateDinner = {setMealsFood}/>
        </div> 
      </div>
      
    </div>
    

  );
};

export default Dashboard;
