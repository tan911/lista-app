'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#2563eb',
    },
} satisfies ChartConfig

const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
    { month: 'June', desktop: 500, mobile: 140 },
    { month: 'June', desktop: 100, mobile: 140 },
]

export default function MetricsChart() {
    return (
        <div className="flex flex-col gap-4 w-full md:flex-row md:gap-10">
            <Card className="w-full">
                <CardHeader className="px-3 pt-3 pb-0">
                    <CardTitle className="text-sm text-muted-foreground tracking-wide">
                        Sales
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center gap-2 px-3 pt-0">
                    <div className="w-[50%] flex-auto">
                        <p className="w-full mb-1.5">
                            <span className="font-bold text-muted-foreground">$</span>
                            <span className="text-2xl font-extrabold">200,000</span>
                        </p>
                        <p className="text-sm font-medium tracking-wide">
                            <span>+$190.90</span>
                            <span> vs </span>
                            <span>last month</span>
                        </p>
                    </div>
                    <div className="w-[50%]">
                        <ChartContainer config={chartConfig} className="h-[100px] w-full">
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} horizontal={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tick={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <defs>
                                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-desktop)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-desktop)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-mobile)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-mobile)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <Area
                                    dataKey="desktop"
                                    type="natural"
                                    fill="url(#fillDesktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                    stackId="a"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader className="px-3 pt-3 pb-0">
                    <CardTitle className="text-sm text-muted-foreground tracking-wide">
                        Customer
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center gap-2 px-3 pt-0">
                    <div className="w-[50%] flex-auto">
                        <p className="w-full mb-1.5">
                            <span className="font-bold text-muted-foreground">$</span>
                            <span className="text-2xl font-extrabold">200,000</span>
                        </p>
                        <p className="text-sm font-medium tracking-wide">
                            <span>+$190.90</span>
                            <span> vs </span>
                            <span>last month</span>
                        </p>
                    </div>
                    <div className="w-[50%]">
                        <ChartContainer config={chartConfig} className="h-[100px] w-full">
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} horizontal={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tick={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <defs>
                                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-desktop)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-desktop)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-mobile)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-mobile)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <Area
                                    dataKey="desktop"
                                    type="natural"
                                    fill="url(#fillDesktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                    stackId="a"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader className="px-3 pt-3 pb-0">
                    <CardTitle className="text-sm text-muted-foreground tracking-wide">
                        Total Revenue
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center gap-2 px-3 pt-0">
                    <div className="w-[50%] flex-auto">
                        <p className="w-full mb-1.5">
                            <span className="font-bold text-muted-foreground">$</span>
                            <span className="text-2xl font-extrabold">200,000</span>
                        </p>
                        <p className="text-sm font-medium tracking-wide">
                            <span>+$190.90</span>
                            <span> vs </span>
                            <span>last month</span>
                        </p>
                    </div>
                    <div className="w-[50%]">
                        <ChartContainer config={chartConfig} className="h-[100px] w-full">
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} horizontal={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tick={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <defs>
                                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-desktop)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-desktop)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-mobile)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-mobile)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <Area
                                    dataKey="desktop"
                                    type="natural"
                                    fill="url(#fillDesktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                    stackId="a"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
