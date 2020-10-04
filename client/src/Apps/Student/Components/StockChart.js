import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const StockChart = ({ width = 475, height = 150, data }) => {
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 25, right: 30, left: 10, bottom: 25 }}
    >
      <CartesianGrid strokeDasharray="10 10" />
      <XAxis
        dataKey="time"
        axisLine={false}
        tickLine={true}
        hide={true}
        mirror
      />
      <YAxis
        tickFormatter={(t) => t.toFixed(2)}
        allowDecimals={false}
        dataKey="value"
        type="number"
        domain={["dataMin - 20", "dataMax + 20"]}
      />
      <Tooltip />
      {/* <Legend /> */}
      {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" />   */}
      <Line
        type="monotone"
        dataKey="value"
        stroke="#17ce17"
        strokeWidth={3}
        dot={false}
      />
    </LineChart>
  );
};

export default StockChart;
