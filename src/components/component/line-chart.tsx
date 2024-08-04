import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, CartesianGrid, XAxis, Line, Tooltip, Dot } from "recharts";
import { DepositStatistic } from "@/utils/types/report";

interface LineChartComponentProps {
  data: DepositStatistic[] | null;
}

const formatDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
          <CardDescription>Monthly Data</CardDescription>
        </CardHeader>
        <CardContent>
          <div>No data available</div>
        </CardContent>
      </Card>
    );
  }

  const mappedData = data.map((item) => ({
    month: formatDate(item.date),
    total: item.total,
  }));

  const chartConfig = {
    total: {
      label: "Total Deposit",
      color: "hsl(var(--chart-1))",
    },
  };

  const getSortedDateRange = () => {
    if (data.length === 0) {
      return "No data available";
    }

    const sortedDates = data.map((item) => item.date).sort();
    const startDate = formatDate(sortedDates[0]);
    const endDate = formatDate(sortedDates[sortedDates.length - 1]);

    return `Showing data from ${startDate} to ${endDate}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Monthly Data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={mappedData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 5)} />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Line dataKey="total" type="natural" stroke="var(--color-total)" strokeWidth={2} dot={<CustomDot />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUpIcon className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{getSortedDateRange()}</div>
      </CardFooter>
    </Card>
  );
};

const CustomDot: React.FC<any> = (props) => {
  const { cx, cy, stroke, payload } = props;
  return (
    <Dot cx={cx} cy={cy} stroke={stroke} fill="var(--color-total)" r={4}>
      <text x={cx} y={cy - 10} fill="#000" textAnchor="middle" fontSize="12">
        {payload.total}
      </text>
    </Dot>
  );
};

const CustomTooltip: React.FC<any> = ({ payload, label }) => {
  if (payload && payload.length > 0) {
    const { total } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-300 p-2 rounded shadow-md">
        <div className="font-bold">{label}</div>
        <div>Total Deposit: {total}</div>
      </div>
    );
  }

  return null;
};

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export default LineChartComponent;
