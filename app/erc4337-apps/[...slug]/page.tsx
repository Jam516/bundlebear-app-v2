import { getAppData } from "@/app/actions/getAppData";
import { Metadata } from "next";
import { TimeSelect } from "@/components/time-select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AboutBlock } from "@/components/about-block";
import { SiteFooter } from "@/components/footer";
import { appcolumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { DynamicBarChart } from "@/components/dynamic-bar-chart";
import { DynamicBarChart2 } from "@/components/dynamic-bar-chart2";

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
    title: "BundleBear App Metrics",
    description: "A dashboard tracking the activity of ERC-4337 Apps.",
};

export default async function AppPage({ params }: { params: tParams }) {

    const parameters = await params;
    const [chain = 'all', timeframe = 'week'] = Array.isArray(parameters.slug) ? parameters.slug : [];

    const data = await getAppData({ chain, timeframe });

    const titleparam =
        timeframe === 'day' ? 'Daily' :
            timeframe === 'month' ? 'Monthly' :
                'Weekly';

    const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

    return (
        <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">ERC-4337 Apps</h2>
            </div>
            <div className="flex justify-center">
                <DataTable columns={appcolumns} data={data.leaderboard} entity={false} />
            </div>
            <TimeSelect />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Active Accounts"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart data={data.usage_chart} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Account Market Share"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart data={data.usage_chart} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " UserOps"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart2 data={data.ops_chart} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " UserOps Market Share"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart2 data={data.ops_chart} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <Separator />
            <AboutBlock />
            <SiteFooter />
        </div>
    );
}

