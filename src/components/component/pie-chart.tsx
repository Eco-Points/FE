import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip } from "recharts";
import chroma from "chroma-js";
import { RewardStatistic } from "@/utils/types/report";

interface PieChartComponentProps {
  data: RewardStatistic[] | null; // Allow data to be null
}

const PieChart: React.FC<PieChartComponentProps> = ({ data }) => {
  // Handle case where data is null or empty
  const validData = data ?? []; // Default to an empty array if data is null

  if (validData.length === 0) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  // Generate a color palette based on the number of data items
  const colorPalette = chroma.scale("Set2").mode("lab").colors(validData.length);

  // Prepare chart data with colors
  const chartData = validData.map((item, index) => ({
    name: item.reward_name,
    value: item.total,
    fill: colorPalette[index] || chroma.random().hex(), // Use generated color or fallback to a random color
  }));

  const chartConfig = {
    reward_name: {
      label: "Reward Name",
    },
    total: {
      label: "Total",
    },
  };

  return (
    <Card className="flex flex-col bg-white shadow-lg rounded-lg border border-gray-200">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl font-semibold text-gray-800">Pie Chart - Rewards</CardTitle>
        <CardDescription className="text-gray-600">Showing rewards distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
          <RechartsPieChart>
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" label nameKey="name" outerRadius="80%" innerRadius="50%">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm bg-gray-50 p-4 rounded-b-lg border-t border-gray-200">
        <div className="flex items-center gap-2 font-medium text-green-600">
          Trending up by 5.2% this month <TrendingUpIcon className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing reward distribution for the selected period</div>
      </CardFooter>
    </Card>
  );
};

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export default PieChart;
