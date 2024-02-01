import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TotalSoloUseChartProps {
  cultivableAreaHectares: number;
  vegetationAreaHectares: number;
}

export const TotalSoloUseChart: React.FC<TotalSoloUseChartProps> = ({
  cultivableAreaHectares,
  vegetationAreaHectares,
}) => {
  const data = [
    { name: "Cultivável", value: cultivableAreaHectares },
    { name: "Vegetação", value: vegetationAreaHectares },
  ];

  const COLORS = [
    "#008FFB",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF0000",
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
