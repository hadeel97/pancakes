import React, {Fragment, useState} from 'react';
import './App.css';
import Breakfast from './components/Breakfast';
import Lunch from './components/Lunch';
import Dinner from './components/Dinner';
import Title from './Title';
import './Title.css';
import {DatePicker} from 'antd'



function App() {

  const [mealsFood,setMealsFood] = useState({breakfast:[],lunch:[],dinner:[]})
  const [day, setDay] = useState("")


const getFoodData = async(day) =>{
  try{
    console.log(day)
    fetch(`http://localhost:8000/foodComp?day=${day}`,
    {
        method: "GET",
        headers: {"Content-Type":"application/json"}
    }
    ).then((res)=> res.json()).then(data=>{


      console.log(data)
      const breakfast = data.filter(m => m.meal === "breakfast")
      const lunch = data.filter(m => m.meal === "lunch")
      const dinner = data.filter(m => m.meal === "dinner")
      setMealsFood({breakfast:breakfast,lunch:lunch,dinner:dinner})
    }
      )
   
}catch(err){
    console.error(err.message)
}
}

  return (
    <Fragment>
      <Title/>
      <div className="container">
         <DatePicker style={{float: "right"}} onChange = { (day) => {getFoodData(day.format("L")) ; setDay(day.format("L"))}}></DatePicker>
         <Breakfast meals = {mealsFood.breakfast} day = {day}/>
         <Lunch meals = {mealsFood.lunch} day = {day}/>
         <Dinner meals = {mealsFood.dinner} day = {day}/>
      </div>
    </Fragment>
  );
  
}



export default App;
