"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ApplyDataLengthParams } from "@/utils/types/job";
import { useEffect, useState } from "react";
interface ChartDataParams {
  browser: string;
  applicants: number;
  fill: string;
}
const arrColor: string[] = [
  "var(--color-chrome)",
  "var(--color-safari)",
  "var(--color-firefox)",
  "var(--color-edge)",
];
const chartConfig = {
  applicants: {
    label: "Applicants",
  },
  chrome: {
    label: "Chrome",
    color: "#FB923C", // Tailwind color: orange-500
  },
  safari: {
    label: "Safari",
    color: "#04D262", // Tailwind color: green-500
  },
  firefox: {
    label: "Firefox",
    color: "#E64746", // Tailwind color: red-500
  },
  edge: {
    label: "Edge",
    color: "#259AE6", // Tailwind color: blue-500
  },
} satisfies ChartConfig;

function PieChartComponent({
  applyData = [],
}: {
  applyData: ApplyDataLengthParams[];
}) {
  const [chartData, setChartData] = useState<ChartDataParams[]>([]);

  useEffect(() => {
    let applyArr: ChartDataParams[] = [];
    applyData.forEach((data: ApplyDataLengthParams, index: number) => {
      if (index <= 2)
        applyArr.push({
          browser: data.title,
          applicants: data.length,
          fill: arrColor[index],
        });
      else if (index == 3)
        applyArr.push({
          browser: "other",
          applicants: data.length,
          fill: arrColor[index],
        });
      else applyArr[3].applicants += data.length;
    });
    setChartData(
      applyArr.length > 0
        ? applyArr
        : [{ browser: "chrome", applicants: 275, fill: arrColor[0] }]
    );
    //eslint-disable-next-line
  }, [applyData]);
  const totalApplicants = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.applicants, 0);
    //eslint-disable-next-line
  }, [chartData]);
  return (
    <div className="h-auto">
      <Card className="flex flex-col justify-center gap-[87px] shadow-md">
        <CardHeader>
          <CardTitle>Pie Chart - Number Of Apply</CardTitle>
          <CardDescription>For Each Job</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="relative w-[300px] h-[300px] "
          >
            <PieChart className="absolute">
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="applicants"
                nameKey="browser"
                innerRadius={100}
                outerRadius={120}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalApplicants.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Applicants
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-[15px] text-sm pb-[44px]">
          {chartData.map(
            (data: ChartDataParams, index) =>
              data.applicants > 0 && (
                <div
                  key={index}
                  className="flex px-6  w-full gap-[5px] items-center"
                >
                  <div
                    className="w-[15px] h-[15px] rounded-full "
                    style={{ backgroundColor: data.fill }}
                  ></div>
                  <p>{data.browser}</p>
                </div>
              )
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
export default PieChartComponent;
