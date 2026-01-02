import React from 'react'
import { Button } from '../../components/ui/button'
import { ProductDataTable } from '../../components/producttable/ProductDataTable'
import { columns} from '../../components/producttable/ProductColumn'
import { Card, CardContent } from '../../components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '../../components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import PageTitleBar from '../../components/pagetitlebar/PageTitleBar'


const Product = () => {

  const data = [
    {
      id: "101",
      product: {
        name: "Desk Lamp Modern",
        img: "https://picsum.photos/300",
      },
      views: 78000,
      pricing: 2499,
      revenue: 194922,
    },
    {
      id: "102",
      product: {
        name: "Coffee Machine Deluxe",
        img: "https://picsum.photos/301",
      },
      views: 92000,
      pricing: 15999,
      revenue: 1471908,
    },
    {
      id: "103",
      product: {
        name: "Waterproof Backpack",
        img: "https://picsum.photos/302",
      },
      views: 125000,
      pricing: 4499,
      revenue: 562375,
    },
    {
      id: "104",
      product: {
        name: "Smart Home Hub",
        img: "https://picsum.photos/303",
      },
      views: 68000,
      pricing: 8999,
      revenue: 611932,
    },
    {
      id: "105",
      product: {
        name: "Fitness Tracker Band",
        img: "https://picsum.photos/304",
      },
      views: 195000,
      pricing: 3999,
      revenue: 779805,
    },
    {
      id: "106",
      product: {
        name: "Electric Toothbrush",
        img: "https://picsum.photos/305",
      },
      views: 110000,
      pricing: 5999,
      revenue: 659890,
    },
    {
      id: "107",
      product: {
        name: "4K Action Camera",
        img: "https://picsum.photos/306",
      },
      views: 83000,
      pricing: 29999,
      revenue: 2489917,
    },
    {
      id: "108",
      product: {
        name: "Plant Pot Set",
        img: "https://picsum.photos/307",
      },
      views: 47000,
      pricing: 1999,
      revenue: 93953,
    },
    {
      id: "109",
      product: {
        name: "Gaming Console",
        img: "https://picsum.photos/308",
      },
      views: 185000,
      pricing: 49999,
      revenue: 9249815,
    },
    {
      id: "110",
      product: {
        name: "Insulated Water Bottle",
        img: "https://picsum.photos/309",
      },
      views: 155000,
      pricing: 2499,
      revenue: 387345,
    },
  ];
  const chartData = [
    { month: "January", desktop: 186, mobile: 320 },
    { month: "February", desktop: 305, mobile: 415 },
    { month: "March", desktop: 237, mobile: 380 },
    { month: "April", desktop: 73, mobile: 185 },
    { month: "May", desktop: 209, mobile: 340 },
    { month: "June", desktop: 278, mobile: 420 },
    { month: "July", desktop: 214, mobile: 365 },
    { month: "August", desktop: 175, mobile: 310 },
    { month: "September", desktop: 314, mobile: 480 },
    { month: "October", desktop: 230, mobile: 390 },
    { month: "November", desktop: 180, mobile: 320 },
    { month: "December", desktop: 120, mobile: 280 },
  ];
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
    <div>
     <PageTitleBar title="Product" path="/add-product" buttonTitle='Add Product'/>
      <div className="Product-container grid grid-cols-12 gap-x-4">
        <div className="table-box col-span-9">
          <ProductDataTable columns={columns} data={data} />
        </div>
        <div className="area-graph-pane col-span-3">
          {/* GRAPH PANE */}
          <Card className="dash-bar col-span-4">
            <CardContent>
              <ChartContainer config={chartConfig}>
                <AreaChart
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
                  <Area
                    dataKey="desktop"
                    type="linear"
                    fill="var(--color-desktop)"
                    fillOpacity={0}
                    stroke="var(--color-desktop)"
                  />
                  <Area
                    dataKey="mobile"
                    type="linear"
                    fill="var(--color-mobile)"
                    fillOpacity={0}
                    stroke="var(--color-mobile)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Product