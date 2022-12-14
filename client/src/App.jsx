import React, {Fragment} from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from './components/auth/Login';
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/auth/Registration";
import Landing from "./components/landingpage";

function App() {

  useEffect(() => {
    localStorage.getItem("token")? setIsAuthenticated(true): setIsAuthenticated(false);
  }, [localStorage.getItem("token")]);


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path="/" 
            render={props =>
            !isAuthenticated ? (
              <Landing {...props}/>
            ):(
              <Redirect to="/dashboard"/>
            )}/>
            <Route exact path="/login" 
            render={props =>
            !isAuthenticated ? (
              <Login {...props} setAuth={setAuth}/>
            ):(
              <Redirect to="/dashboard"/>
            )}/>
            <Route exact path="/register" 
            render={props =>
            !isAuthenticated ? (
              <Register {...props} setAuth={setAuth}/>
            ):(
              <Redirect to="/login"/>
            )}/>
            <Route exact path="/dashboard" 
            render={props =>
            isAuthenticated ? (
              <Dashboard {...props} setAuth={setAuth}/>
            ):(
              <Redirect to="/login"/>
            )}/>
          </Switch>
        </div>
       </Router>
    </Fragment>
  );
  
}

export default App;
