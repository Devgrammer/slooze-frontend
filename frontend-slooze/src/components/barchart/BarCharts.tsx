import {
  Card,
  CardContent,

} from "../../components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from '../../lib/utils';

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
  dataY: YearOption[]
  dataX: MonthlyTraffic[];
  cl:string
}

const BarCharts = ({dataX, cl}:AnalyticsChartProps) => {
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
       <Card className={cn("dash-bar ",cl)}>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
              <BarChart accessibilityLayer data={dataX}>
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
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
       
  )
}

export default BarCharts