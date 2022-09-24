import React, { Fragment } from "react";
import Title from "./Title";

const Landing = () => {
    return(
        <Fragment>
        <Title/>
        <div className="Container">
            <h1 style={{color:"purple"}}>Welcom To Pancakes</h1>
            <p> Sign In and start tracking your meals</p>
        </div>
        </Fragment>
    );
};

export default Landing;