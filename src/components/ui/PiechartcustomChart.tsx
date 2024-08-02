// PiechartcustomChart.tsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useChart } from "@/utils/contexts/chartContext";

interface PiechartcustomChartProps {
  data: Array<{ name: string; value: number; color: string }>;
}

const PiechartcustomChart: React.FC<PiechartcustomChartProps> = ({ data }) => {
  useChart(); // Mengakses konteks jika perlu

  // Pastikan data adalah array dan bukan undefined/null
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="aspect-[4/3]">
      <PieChart>
        <Pie data={safeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" fill="#8884d8">
          {safeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PiechartcustomChart;
