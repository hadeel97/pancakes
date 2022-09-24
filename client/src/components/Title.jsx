import React from 'react'

function Title() {
    return (
      <div className="Title-t" style={{width:"100%", alignItems: "baseline", justifyContent: "left",
        marginBottom: "0em",   fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        fontWeight:"bolder", padding:"1.5em", display: "flex", boxSizing:"border-box"}}>
        <h1 style={{color :"#b584c0"}}> Pancakes </h1>
              <div className="Title-Subtitle">Tracks your daily intake</div>
      </div>
    )
  }

export default Title;


// box-sizing: border-box;
// width: 100%;
// display: flex;
// justify-content: left;
// align-items: baseline;
// padding: 1em;
// margin-bottom: 2em;
// background-color: rgb(47, 8, 55);
// color: rgba(235, 228, 240, 0.82)!important;
// font-family: 'Courier New', Courier, monospace;
// font-weight: bolder;