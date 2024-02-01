import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FarmsByStateChartProps {
  totalFarmsByState: {
    state: string;
    totalFarms: number;
  }[];
}

export const TotalFarmsByStateChart: React.FC<FarmsByStateChartProps> = ({
  totalFarmsByState,
}) => {
  const data = totalFarmsByState?.map((item) => ({
    state: item.state,
    totalFarms: Math.round(item.totalFarms),
  }));

  return (
    <ResponsiveContainer width="30%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="state"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip formatter={(value: number) => [value, "Total de Fazendas"]} />
        <Bar
          dataKey="totalFarms"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
