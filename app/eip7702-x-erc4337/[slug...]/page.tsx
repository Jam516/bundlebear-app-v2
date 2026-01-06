import { getOverlapData } from "@/app/actions/getOverlapData";
import { Metadata } from "next";
// import { TimeSelect } from "@/components/time-select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AboutBlock } from "@/components/about-block-7702";
import { SiteFooter } from "@/components/footer";
import { DynamicBarChartAuth } from "@/components/dynamic-bar-chart-authcontracts";
import { DynamicBarChartAuthOps } from "@/components/dynamic-bar-chart-authcontracts2";
import { DynamicBarChart2 } from "@/components/dynamic-bar-chart2";
import { SimpleLineChart } from "@/components/simple-line-chart";

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
    title: "BundleBear EIP7702 X ERC4337 Metrics",
    description: "A dashboard tracking the ERC-4337 activity of EIP-7702 Accounts.",
};

export default async function OverlapPage({ params }: { params: tParams }) {

    const parameters = await params;
    const [chain = 'all', timeframe = 'week'] = Array.isArray(parameters.slug) ? parameters.slug : [];

    const data = await getOverlapData({ chain, timeframe });

    const titleparam =
        timeframe === 'day' ? 'Daily' :
            timeframe === 'month' ? 'Monthly' :
                'Weekly';

    const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

    const appUseropsData = data.eip7702_x_erc4337_app_userops.map((entry) => ({
        DATE: entry.DATE,
        NUM_OPS: Number(entry.NUM_USEROPS ?? entry.NUM_OPS ?? 0),
        PROJECT: entry.PROJECT
    }));

    return (
        <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">EIP-7702 X ERC-4337</h2>
            </div>
    
            <p className="text-muted-foreground text-m">This page tracks the ERC-4337 activity of EIP-7702 Accounts</p>
            {/* <Separator /> */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Active 7702X4337 Accounts by Authorized Contract"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChartAuth data={data.eip7702_x_erc4337_accounts} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Active 7702X4337 UserOps by Authorized Contract"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChartAuthOps data={data.eip7702_x_erc4337_userops} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Share of ERC-4337 UserOps from 7702 Accounts"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <SimpleLineChart
                            data={data.eip7702_x_erc4337_userops_pct}
                            xaxis={"DATE"}
                            yaxis={"PCT_EIP7702_USEROPS"}
                            percent={true}
                            percentDecimals={2}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Share of ERC-4337 Gas Cost from 7702 Accounts"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <SimpleLineChart
                            data={data.eip7702_x_erc4337_userops_gascost_pct}
                            xaxis={"DATE"}
                            yaxis={"PCT_EIP7702_ACTUALGASCOST"}
                            percent={true}
                            percentDecimals={2}
                        />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Share of 7702 Actions that are ERC-4337 UserOps"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <SimpleLineChart
                            data={data.eip7702_x_erc4337_actions_pct}
                            xaxis={"DATE"}
                            yaxis={"PCT_USEROP_ACTIONS"}
                            percent={true}
                            percentDecimals={2}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " 7702 x 4337 UserOps by App"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart2 data={appUseropsData} />
                    </CardContent>
                </Card>
            </div>
            <Separator />
            <AboutBlock />
            <SiteFooter />
        </div>
    );
}

