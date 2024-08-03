import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type LineChartProps = {
  data: { month: string; desktop: number }[];
};

function LinechartChart({ data }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="desktop" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LinechartChart;
