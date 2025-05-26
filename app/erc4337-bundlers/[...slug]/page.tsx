import { getBundlerData } from "@/app/actions/getBundlerData";
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
import { UnifiedLineChart } from "@/components/unified-line-chart";
import { MultiopBarChart } from "@/components/multiop-bar-chart";
import { UnifiedBarChart } from "@/components/unified-bar-chart";
import { BUNDLER_BARS } from '@/components/bar-config';
import { BUNDLER_LINES } from '@/components/line-config';
import { bundlercolumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
    title: "BundleBear Bundler Metrics",
    description: "A dashboard tracking the activity of ERC-4337 Bundlers.",
};

export default async function BundlerPage({ params }: { params: tParams }) {

    const parameters = await params;
    const [chain = 'all', timeframe = 'week'] = Array.isArray(parameters.slug) ? parameters.slug : [];

    const data = await getBundlerData({ chain, timeframe });

    const titleparam =
        timeframe === 'day' ? 'Daily' :
            timeframe === 'month' ? 'Monthly' :
                'Weekly';

    const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

    return (
        <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">ERC-4337 Bundlers</h2>
            </div>
            <div className="flex justify-center">
                <DataTable columns={bundlercolumns} data={data.leaderboard} entity={false} />
            </div>
            <TimeSelect />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " UserOps Bundled"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.userops_chart} xaxis={"DATE"} yaxis={"NUM_USEROPS"} segment={"BUNDLER_NAME"} barConfig={BUNDLER_BARS} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " UserOp Marketshare"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.userops_chart} xaxis={"DATE"} yaxis={"NUM_USEROPS"} segment={"BUNDLER_NAME"} barConfig={BUNDLER_BARS} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " OnChain Revenue"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.revenue_chart} xaxis={"DATE"} yaxis={"REVENUE"} segment={"BUNDLER_NAME"} barConfig={BUNDLER_BARS} usd={true} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Active Accounts"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedLineChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"BUNDLER_NAME"} lineConfig={BUNDLER_LINES} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Bundle Txns Failed due to Frontrunning"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.frontrun_chart} xaxis={"DATE"} yaxis={"NUM_BUNDLES"} segment={"BUNDLER_NAME"} barConfig={BUNDLER_BARS} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " % Bundle Txns Frontran"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <MultiopBarChart data={data.frontrun_pct_chart} xaxis={"DATE"} yaxis={"PCT_FRONTRUN"} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + " Multi-UserOp Bundles " + titleparam + " % Share"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <MultiopBarChart data={data.multi_userop_chart} xaxis={"DATE"} yaxis={"PCT_MULTI_USEROP"} />
                    </CardContent>
                </Card>
                {/* <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " UserOp Marketshare"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <BundlerBarChart data={data.userops_chart} xaxis={"DATE"} yaxis={"NUM_USEROPS"} segment={"BUNDLER_NAME"} isPercentage={true} />
                    </CardContent>
                </Card> */}
            </div>
            <Separator />
            <AboutBlock />
            <SiteFooter />
        </div>
    );
}

