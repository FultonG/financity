import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from "recharts";

const StockChart =  ({ width=275, height=150, data }) => {
    return (
        <LineChart width={width} height={height} data={data} 
            margin={{ top: 25, right: 30, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} hide={true} mirror/>
            <YAxis dataKey="value" domain={['dataMin - 10', 'dataMax + 10']} />
            <Tooltip />
            {/* <Legend /> */}
            {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" />   */}
            <Line type="monotone" dataKey="value" stroke="#17ce17" strokeWidth={3} dot={false}/>
        </LineChart>
    )
}

export default StockChart