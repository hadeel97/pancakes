
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="jumbotron mt-5" style={{backgroundColor : "rgb(41, 40, 41)" , borderRadius:"20px", boxSizing: "border-box",
    boxShadow: "0px 0px 4px 4px rgb(218, 178, 218)", alignItems: "baseline", 
    blockSize:"300px", width:"600px", marginLeft:"auto", marginRight:"auto"}}>
      <h1 style={{width:"100%", fontFamily:"'Courier New', Courier, monospace",
        fontWeight:"bolder", display: "flex", boxSizing:"border-box", color:"white", marginLeft:"38px"}}>Welcome to Pancakes</h1>
      <p style={{width:"100%", fontFamily:"'Courier New', Courier, monospace",
         fontWeight:"bolder", color:"white", marginLeft:"55px"}}>Sign In and start tracking your daily intake</p>
      <Link to="/login" className="btn btn-primary custom-btn2" style={{color: "rgb(41, 40, 41)", marginLeft:"178px", marginTop:"25px"}}>
        Sign In
      </Link>
      <Link to="/register" className="btn btn-primary custom-btn2" style={{color: "rgb(41, 40, 41)", marginLeft:"27px", marginTop:"25px"}}>
        Sign Up
      </Link>
    </div>
  );
};

export default Landing;