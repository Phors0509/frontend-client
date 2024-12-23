import { Card } from "@/components/ui/card";
import { Clock, DollarSign, RefreshCcw } from "lucide-react";

const stats = [
  {
    title: "Sales",
    value: "2358",
    change: "+23%",
    icon: Clock,
    color: "bg-pink-100",
    textColor: "text-pink-500",
  },
  {
    title: "Refunds",
    value: "434",
    change: "-12%",
    icon: RefreshCcw,
    color: "bg-purple-100",
    textColor: "text-purple-500",
  },
  {
    title: "Earnings",
    value: "$245k",
    change: "+8%",
    icon: DollarSign,
    color: "bg-emerald-100",
    textColor: "text-emerald-500",
  },
];

export function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl font-bold">{stat.value}</h2>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+")
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
            <div
              className={`${stat.color} ${stat.textColor} p-3 rounded-full`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}