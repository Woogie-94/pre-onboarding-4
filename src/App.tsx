import { useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import mockData from "./mocks/data.json";

interface ChartMockData {
  id: string;
  value_area: number;
  value_bar: number;
}
const rowData = mockData.response as Record<string, ChartMockData>;
const data = Object.keys(rowData).map(key => ({ ...rowData[key], name: key.split(" ")[1] }));
const districts = ["성북구", "강남구", "노원구", "중랑구"];

function App() {
  const [district, setDistrict] = useState("");

  return (
    <>
      <button onClick={() => setDistrict("")}>해제</button>
      {districts.map(item => (
        <button
          key={item}
          style={{ backgroundColor: item === district ? "#7876ce" : "inherit" }}
          onClick={() => setDistrict(item)}
        >
          {item}
        </button>
      ))}
      <ResponsiveContainer width="100%" height={800}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis dataKey="value_bar" orientation="right" label={{ value: "Bar", angle: 90, position: "insideRight" }} />
          <YAxis
            yAxisId="area"
            dataKey="value_area"
            domain={[0, (max: number) => Math.max(max * 2, 200)]}
            orientation="left"
            label={{ value: "Area", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="value_bar" fill="#7876ce" onClick={data => setDistrict(data.id)}>
            {data.map(entry => (
              <Cell fill={entry.id === district ? "#5250d1" : "#7876ce"} key={entry.id} />
            ))}
          </Bar>
          <Area yAxisId="area" type="monotone" dataKey="value_area" fill="#da5d5d" stroke="#da5d5d" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}

export default App;
