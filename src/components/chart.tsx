"use client";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ApplyMonthlyParams } from "@/app/dashboard/chart/chart";
const chartConfig = {};
function ChartComponent({applyMonthly,colors}:{applyMonthly:ApplyMonthlyParams[],colors:string[]}) {
  return (
    <div className="font-roboto h-auto">

        <Card className="w-full h-full">
          {/* Content with flexible height */}
          <CardContent className="w-full h-11/12">
            <ChartContainer config={chartConfig}>
              <AreaChart
                width={600}
                height={250}
                data={applyMonthly}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="2 2" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={true}
                  axisLine={true}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: any) => `${value}`}
                />
                <Tooltip
                  cursor={{ stroke: "#f97316", strokeWidth: 1 }}
                  content={<ChartTooltipContent indicator="dot" />}
                />

                {applyMonthly.length > 0 &&
                  Object.keys(applyMonthly[0]).map(
                    (key: string, index: number) => {
                      return (
                        key !== "month" && (
                          <Area
                            key={index}
                            type="monotone"
                            dataKey={key}
                            stroke={colors[index]}
                            fill={colors[index]}
                            fillOpacity={0.2}
                            stackId="a"
                          />
                        )
                      );
                    }
                  )}
              </AreaChart>
            </ChartContainer>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex justify-between items-center">
            <div className="flex gap-4">
              <Button variant="outline">Monthly</Button>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Export PDF
            </Button>
          </CardFooter>
        </Card>
    </div>
  );
}

export default ChartComponent;
