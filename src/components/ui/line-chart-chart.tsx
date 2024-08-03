// LinechartChart.tsx
import React from "react";
import { CartesianGrid, XAxis, Line, LineChart, Tooltip, ResponsiveContainer } from "recharts";
import { useChart } from "@/utils/contexts/chartContext";

interface LinechartChartProps {
  data: any[];
}

const LinechartChart: React.FC<LinechartChartProps> = ({ data }) => {
  useChart(); // Mengakses konteks jika perlu

  return (
    <div className="aspect-[4/3]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
          <Tooltip content={<div>Tooltip</div>} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LinechartChart;
