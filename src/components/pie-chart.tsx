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
const defaultPieData = {
  browser: "No Data",
  applicants: 275,
  fill: arrColor[0],
};
function PieChartComponent({
  applyData = [],
}: {
  applyData: ApplyDataLengthParams[];
}) {
  const [chartData, setChartData] = useState<ChartDataParams[]>([
    defaultPieData,
  ]);

  useEffect(() => {
    let applyArr: ChartDataParams[] = [];
    let allZero = true;

    applyData.forEach((data: ApplyDataLengthParams, index: number) => {
      const applicants = data.length;
      if (applicants > 0) {
        allZero = false;
      }

      if (index <= 2) {
        applyArr.push({
          browser: data.title,
          applicants,
          fill: arrColor[index],
        });
      } else if (index == 3) {
        applyArr.push({
          browser: "other",
          applicants,
          fill: arrColor[index],
        });
      } else {
        applyArr[3].applicants += applicants;
      }
    });

    if (allZero) {
      // If all applicants are zero, set default chart data
      setChartData([defaultPieData]);
    } else {
      setChartData(applyArr);
    }
  }, [applyData]);

  const totalApplicants = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.applicants, 0);
    //eslint-disable-next-line
  }, [chartData]);
  return (
    <div className="h-full">
      <Card className="flex flex-col w-full h-full justify-center gap-[87px] shadow-md dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border p-[20px] rounded-[5px]">
        <CardHeader>
          <CardTitle>Pie Chart - Number Of Apply</CardTitle>
          <CardDescription>For Each Job</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className=" w-[300px] h-[300px] m-auto "
          >
            <PieChart className=" ">
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
                            className="text-3xl font-bold fill-foreground"
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
