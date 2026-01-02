import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Bar,
  BarChart,
  Area,
  AreaChart,
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
import { Badge } from "@/components/ui/badge";
import PageTitleBar from "../../components/pagetitlebar/PageTitleBar";
import { ArrowUpIcon, NotepadText, NotepadTextDashed, TrendingUp } from "lucide-react";
import year from "../../data/year.json";
import chartData from "../../data/chartdata.json";
import BarCharts from "../../components/barchart/BarCharts";
import LineCharts from "../../components/linecharts/LineCharts";
import AreaCharts from "../../components/areachart/AreaCharts";

const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  });

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
    <div className="w-full min-h-screen space-y-4">
      <PageTitleBar
        title="Product"
        path="/add-product"
        buttonTitle="Add Product"
      />

      {/* STAT FIGURES */}
      <section className="dashboard-stats grid grid-cols-12 gap-x-4">
        {Array(4)
          .fill(0)
          .map(() => {
            return (
              <Card className="@container/card col-span-3">
                <CardHeader>
                  <CardDescription className="font-semibold">
                    Total Revenue
                  </CardDescription>
                  <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-2xl">
                    $1,250.00
                  </CardTitle>
                  <CardAction>
                    <span className="w-6 h-6 border rounded-sm flex justify-center items-center">
                      <NotepadText size={16} />
                    </span>
                  </CardAction>
                </CardHeader>
                <CardFooter className="flex items-center gap-1.5 text-sm ">
                  <div className="text-muted-foreground">Trend Title</div>
                  <div className=" flex items-center text-green-600">3.54% <ArrowUpIcon size={14}/></div>
                </CardFooter>
              </Card>
            );
          })}
      </section>

      {/* BAR GRAPH SECTION */}
      <section className="dashboard-graph grid grid-cols-12 gap-x-4 max-h-fit ">
        {/* GRAPH PANE */}
        <BarCharts dataX={chartData} dataY={year} cl={"col-span-7"} />
        {/* SALE PANE*/}
        <Card className="dash-recent-sales col-span-5 ">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made recent 350 sales this month
            </CardDescription>
          </CardHeader>
          <div className="sales-container px-6 space-y-4">
            {Array(4)
              .fill(0)
              .map(() => {
                return (
                  <Card className="h-18  px-2 place-content-center">
                    <CardContent className="w-full px-2 flex justify-between items-center">
                      <div className="left-side !flex  items-center gap-x-2 ">
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
                          <div className="salesman-email">
                            indra@example.com
                          </div>
                        </div>
                      </div>
                      <div className="right-side">
                        <div className="salesman-name">15000</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </Card>
      </section>

      {/* STAT SECTION */}
      <section className="stat space-y-4 ">
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

        {/* GRAPH SECTION */}
        <div className="dashboard-graph grid grid-cols-12 gap-x-4 ">
          {/* LINE GRAPH */}
          <LineCharts dataX={chartData} dataY={year} cl={"col-span-8"} />

          {/* BAR GRAPH PANE*/}
          <BarCharts dataX={chartData} dataY={year} cl={"col-span-4"} />
        </div>

        {/* LINE & BAR */}
        <div className="dashboard-graph grid grid-cols-12 gap-x-4 ">
          {/* BAR GRAPH PANE*/}
          <BarCharts dataX={chartData} dataY={year} cl={"col-span-8"} />

          {/* GRAPH PANE */}
          <LineCharts dataX={chartData} dataY={year} cl={"col-span-4"} />
        </div>
      </section>

      {/* STAT SECTION */}
      <section className="stat space-y-4 ">
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

        {/* AREA GRAPH */}
        <div className="dashboard-graph grid grid-cols-12 gap-x-4 ">
          {/* GRAPH PANE */}
          {Array(3)
            .fill(0)
            .map(() => {
              return (
                <AreaCharts dataX={chartData} dataY={year} cl={"col-span-4"} />
              );
            })}
        </div>

        {/* LINE & BAR */}
        <div className="dashboard-graph grid grid-cols-12 gap-x-4 ">
          {/* BAR GRAPH PANE*/}
          <BarCharts dataX={chartData} dataY={year} cl={"col-span-4"} />

          {/* TOP SALE PRODUCT PANE*/}
          <Card className="dash-top-sales col-span-4 ">
            <CardHeader>
              <CardTitle>Top Sales Product</CardTitle>
              <CardDescription>Manage you top sales.</CardDescription>
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

          {/* PAYMENT HISTORY PANE*/}
          <Card className="dash-payment-history col-span-4 ">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Manage your payments</CardDescription>
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
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
