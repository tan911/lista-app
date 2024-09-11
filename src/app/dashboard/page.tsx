import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MetricsChart from './_components/metrics_chart'
import NewCredit from './_components/new_credit'

export default async function Page() {
    return (
        <Tabs defaultValue="today" className="w-full">
            <div className="flex items-center justify-between mb-6">
                <TabsList>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <NewCredit />
            </div>
            <TabsContent value="today" className="w-full">
                <MetricsChart />
            </TabsContent>
            <TabsContent value="weekly" className="w-full">
                <MetricsChart />
            </TabsContent>
            <TabsContent value="monthly" className="w-full">
                <MetricsChart />
            </TabsContent>
        </Tabs>
    )
}
