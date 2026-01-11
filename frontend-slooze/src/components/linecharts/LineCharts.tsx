import {
  Card,
  CardContent,
} from "../../components/ui/card";
import {
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "../../lib/utils";

interface YearOption {
  label: string;
  value: number;
}
interface MonthlyTraffic {
  month: string;
  desktop: number;
  mobile: number;
}

interface AnalyticsChartProps {
  dataY: YearOption[];
  dataX: MonthlyTraffic[];
  cl: string;
}

const LineCharts = ({ dataX, cl }: AnalyticsChartProps) => {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-6)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;
  return (
    <Card className={cn("dash-bar ", cl)}>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={dataX}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
                                dataKey="desktop"
                                type="natural"
                                stroke="var(--color-desktop)"
                                strokeWidth={2}
                                dot={{
                                  fill: "var(--color-desktop)",
                                }}
                                activeDot={{
                                  r: 6,
                                }}
                              />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineCharts;
