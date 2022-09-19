// import { PieChart, Pie, Cell, Tooltip, Legend } from "react";
// import React, { useState} from 'react';


// function PieRechartComponent(Protein, Fats, Carbs) {
//   const COLORS = ["#8884d8", "#82ca9d", "#FFBB28"];
//    const [pieData, getPieDate] = useState({Carbs:[],Fats:[],Protein:[]});

// const CustomTooltip = ({ active, payload, label }) => {
//        if (active) {
//           return (
//              <div
//              className="custom-tooltip"
//              style={{
//                 backgroundColor: "#ffff",
//                 padding: "5px",
//                 border: "1px solid #cccc"
//              }}>
//              <label>{`${payload[0].name} : ${payload[0].value}%`}> </label>
//              </div>
//            ) }
        
//            return (
//             <PieChart width={730} height={300}>
//             <Pie
//                data={this.pieData}
//                color="#000000"
//                dataKey="value"
//                nameKey="name"
//                cx="50%"
//                cy="50%"
//                outerRadius={120}
//                fill="#8884d8">
//                {this.pieData.map((entry, index) => (
//                   <Cell
//                      key={`cell-${index}`}
//                      fill={this.COLORS[index % this.COLORS.length]}
//                   />
//                ))}
//             </Pie>
//             <Tooltip content={<this.CustomTooltip />} />
//             <Legend />
//             </PieChart>
//             );
//          };   
//     };


//  export default PieRechartComponent;