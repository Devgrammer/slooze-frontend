import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { FaChevronDown } from "react-icons/fa6";
import { Calendar } from "@/components/ui/calendar";

const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  });
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 278 },
    { month: "July", desktop: 214 },
    { month: "August", desktop: 175 },
    { month: "September", desktop: 314 },
    { month: "October", desktop: 230 },
    { month: "November", desktop: 180 },
    { month: "December", desktop: 120 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-6)",
    },
  } satisfies ChartConfig;

  const year = [
    {
      label: "2000",
      value: 2000,
    },
    {
      label: "2001",
      value: 2001,
    },
    {
      label: "2002",
      value: 2002,
    },
    {
      label: "2003",
      value: 2003,
    },
    {
      label: "2004",
      value: 2004,
    },
    {
      label: "2005",
      value: 2005,
    },
    {
      label: "2006",
      value: 2006,
    },
    {
      label: "2007",
      value: 2007,
    },
    {
      label: "2008",
      value: 2008,
    },
    {
      label: "2009",
      value: 2009,
    },
    {
      label: "2010",
      value: 2010,
    },
    {
      label: "2011",
      value: 2011,
    },
    {
      label: "2012",
      value: 2012,
    },
    {
      label: "2013",
      value: 2013,
    },
    {
      label: "2014",
      value: 2014,
    },
    {
      label: "2015",
      value: 2015,
    },
    {
      label: "2016",
      value: 2016,
    },
    {
      label: "2017",
      value: 2017,
    },
    {
      label: "2018",
      value: 2018,
    },
    {
      label: "2019",
      value: 2019,
    },
    {
      label: "2020",
      value: 2020,
    },
    {
      label: "2021",
      value: 2021,
    },
    {
      label: "2022",
      value: 2022,
    },
    {
      label: "2023",
      value: 2023,
    },
    {
      label: "2024",
      value: 2024,
    },
    {
      label: "2025",
      value: 2025,
    },
  ];
  return (
    <div className="w-full  space-y-6">
        <h1>Dashboard</h1>
      {/* STAT FIGURES */}
      <section className="dashboard-stats grid grid-cols-4 gap-x-4">
        <Card className="mx-w-sm" />
        <Card className="mx-w-sm" />
        <Card className="mx-w-sm" />
        <Card className="mx-w-sm" />
      </section>

      {/* BAR GRAPH SECTION */}
      <section className="dashboard-graph grid grid-cols-12 gap-x-4 ">
        {/* GRAPH PANE */}
        <Card className="dash-bar col-span-8">
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
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
        {/* SALE PANE*/}
        <Card className="dash-recent-sales col-span-4 ">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made recent 350 sales this month
            </CardDescription>
          </CardHeader>
          <div className="sales-container px-6">
            <Card>
              <CardContent className="w-full px-2 flex justify-between items-center">
                <div className="left-side !flex gap-x-2 ">
                  <Avatar>
                    <AvatarImage
                      className="rounded-full w-10"
                      alt="sale"
                      src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <AvatarFallback>Sale</AvatarFallback>
                  </Avatar>
                  <div className="sale-content">
                    <div className="salesman-name">Indra</div>
                    <div className="salesman-email">indra@example.com</div>
                  </div>
                </div>
                <div className="right-side">
                  <div className="salesman-name">15000</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Card>
      </section>

      {/* STAT SECTION */}
      <section className="stat space-y-4">
        {/* FILTERS */}
        <div className="stat filters flex gap-x-4 w-full justify-start items-center">
          <div className="stat-heading text-4xl">Stats</div>
          {/* YEAR */}
          <Select className="!bg-white">
            <SelectTrigger className="w-[100px] bg-white">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year</SelectLabel>
                {year.map((item, index) => {
                  return (
                    <SelectItem key={`yr-${index}`} value={item.value}>
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* DATE */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-64 justify-between font-light text-sm text-neutral-600"
              >
                {dateRange ? dateRange.toString() : "Select date"}
                <FaChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-lg border shadow-sm"
              />
            </PopoverContent>
          </Popover>
          <p>compare</p>
          {/* YEAR */}
          <Select>
            <SelectTrigger className="w-[100px] bg-white">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year</SelectLabel>
                {year.map((item, index) => {
                  return (
                    <SelectItem key={`yr-${index}`} value={item.value}>
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* LINE GRAPH */}
        <div className="dashboard-graph grid grid-cols-12 gap-x-4">
          {/* GRAPH PANE */}
          <Card className="dash-bar col-span-8">
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
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

          {/* BAR GRAPH PANE*/}
          <Card className="dash-bar col-span-4">
            <CardHeader>
              <CardTitle>Total Earning</CardTitle>
              <CardDescription>11,120000200</CardDescription>
            </CardHeader>
            <CardContent className="w-full px-2 flex justify-between items-center">
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
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
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
