import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface CropsChartProps {
  crops: {
    name: string;
    totalFarms: number;
  }[];
}

export const CropsChart: React.FC<CropsChartProps> = ({ crops }) => {
  const data = crops.map((crop) => ({
    name: crop.name,
    value: crop.totalFarms,
  }));

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
          label={({ name, value }) => `${name} (${value})`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
