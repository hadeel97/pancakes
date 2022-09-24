
import React from "react";
import { useState } from "react";
import Title from "../Title";
import { Fragment} from "react";
import { toast } from "react-toastify";



const Login = ( {setAuth})  =>{

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
      });

    const {email , password} = inputs;  

    const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const sendLoginRequest = async (e) =>{
            console.log(e);
            e.preventDefault();
         
        try{
            const body = {email, password};
            console.log(body);
            const response = await fetch("http://localhost:8000/auth/login",
        {
            method: "POST",
            headers: {"Content-Type":"application/json", 'Accept': 'application/json'}, 
            body: JSON.stringify(body)
        }
        );
        const parseRes = await response.json();
        console.log(parseRes);
        if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            toast.success("Logged in Successfully");
        } else {
            setAuth(false);
            toast.error(parseRes);
        }
    }catch(err){
        console.error(err.message)
    } 

    };

    return( 
    <Fragment>
      <Title/>
            <form className="Container" onSubmit={sendLoginRequest}>
              <h4 className="landing-text">Email</h4>
            <input
          type="text"
          name="email"
          value={email}
          placeholder="Enter Email"
          onChange={e => onChange(e)}
          className="landing-text"
          style={{color:"black"}}
        />
        <h4 className="landing-text">Password</h4>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => onChange(e)}
          className="landing-text"
          style={{color:"black"}}
        />    
        <button className="btn btn-primary custom-btn2"  style={{marginLeft:"75px"}}>Sign In</button>
              </form>
    </Fragment>
    );
};

export default Login;