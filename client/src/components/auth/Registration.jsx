import React, { Fragment, useState } from 'react';
import Title from '../Title';

function Registration() {

    const [inputs, setInputs] = useState({
        uname: "",
        email: "",
        age: "",
        gender: "",
        password: ""
      });

   
    const {uname, email, age, gender , password} = inputs; 
    
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }


    const sendRegistrationRequest = async (e) =>{
        console.log(e);
        e.preventDefault();
     
    try{
        const body = { uname, email, age, gender, password};
        console.log(body);
        await fetch("http://localhost:8000/auth/register",
    {
        method: "POST",
        headers: {"Content-Type":"application/json", 'Accept': 'application/json'}, 
        body: JSON.stringify(body)
    }
    )

}catch(err){
    console.error(err.message)
} 

};
 
    return( 
    <Fragment> 
            <Title/>
          <form className="Container" onSubmit={sendRegistrationRequest}>
             
                  <h5 className="landing-text">User Name </h5>
                  <input
          type="text"
          name="uname"
          value={uname}
          placeholder="Username"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
                  <h5 className="landing-text"> Email </h5>
                  <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />

        <h5 className='landing-text'> Age </h5>

        <input
          type="number"
          name="age"
          value={age}
          placeholder="Age"
          onChange={e => onChange(e)}
          className="form-control my-3"
          style={{borderRadius:"10px", width:"70px"}}
        />

          <input
          type="text"
          name="gender"
          value={gender}
          placeholder="Gender"
          onChange={e => onChange(e)}
          className="form-control my-3"
          maxLength={"1"}
          style={{borderRadius:"10px", width:"110px"}}
        />
        

         <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={e => onChange(e)}
          className="form-control my-3"
          
        />
                  
              <button className="btn btn-primary custom-btn2"  
                style={{marginLeft:"75px"}}>Sign Up</button>
            </form>

      </Fragment>
      
    )       
}
export default Registration;