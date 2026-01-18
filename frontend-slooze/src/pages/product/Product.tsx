import { ProductDataTable } from '../../components/producttable/ProductDataTable'
import { columns} from '../../components/producttable/ProductColumn'
import { Card, CardContent } from '../../components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '../../components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import PageTitleBar from '../../components/pagetitlebar/PageTitleBar'
import { API_URLS } from '@/constant/api'
import axios from 'axios'
import { useAuth } from '@/context/authContext'
import { useEffect, useState } from 'react'





const Product = () => {
  const token = sessionStorage.getItem('token');
  const {setError} = useAuth();
  const [productData, setProductData]= useState([])


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

 

  const fetchProduct = async()=>{
    try{
      const response = await axios.get(API_URLS.PRODUCTS.ALL, {
        headers:{
            authorization: `Bearer ${token}`,
        }
      });

        if(response.status === 201){
          setProductData(response.data.data)
      }
    }catch(error){
      console.error(error)
      setError(JSON.stringify(error))
    }
  }

 useEffect(() => {
   fetchProduct();
 }, []);

  return (
    <div>
      <PageTitleBar
        title="Product"
        path="/add-product"
        buttonTitle="Add Product"
      />
      <div className="Product-container grid grid-cols-12 gap-x-4">
        <div className="table-box col-span-9">
          <ProductDataTable columns={columns} data={productData} />
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