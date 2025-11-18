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

    return (
        <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">EIP-7702 X ERC-4337</h2>
            </div>
            <Separator />
            <p className="text-sm">This page tracks the ERC-4337 activity of EIP-7702 Accounts</p>
            <Separator />
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
            <Separator />
            <AboutBlock />
            <SiteFooter />
        </div>
    );
}

