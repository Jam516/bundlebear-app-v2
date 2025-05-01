import { getPaymasterData } from "@/app/actions/getPaymasterData";
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
import { UnifiedBarChart } from "@/components/unified-bar-chart";
import { UnifiedLineChart } from "@/components/unified-line-chart";
import { PAYMASTER_BARS } from '@/components/bar-config';
import { PAYMASTER_TYPE_BARS } from '@/components/bar-config';
import { PAYMASTER_LINES } from "@/components/line-config";
import { paymastercolumns } from "@/components/columns"
import { DataTable } from "@/components/data-table"

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
    title: "BundleBear Paymaster Metrics",
    description: "A dashboard tracking the activity of ERC-4337 Paymasters.",
};

export default async function PaymasterPage({ params }: { params: tParams }) {

    const parameters = await params;
    const [chain = 'all', timeframe = 'week'] = Array.isArray(parameters.slug) ? parameters.slug : [];

    const data = await getPaymasterData({ chain, timeframe });

    const titleparam =
        timeframe === 'day' ? 'Daily' :
            timeframe === 'month' ? 'Monthly' :
                'Weekly';

    const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

    return (
        <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Paymasters</h2>
            </div>
            <div className="flex justify-center">
                <DataTable columns={paymastercolumns} data={data.leaderboard} entity={false} />
            </div>
            <TimeSelect />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " UserOps Served"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.userops_chart} xaxis={"DATE"} yaxis={"NUM_USEROPS"} segment={"PAYMASTER_NAME"} barConfig={PAYMASTER_BARS} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " UserOp Marketshare"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.userops_chart} xaxis={"DATE"} yaxis={"NUM_USEROPS"} segment={"PAYMASTER_NAME"} barConfig={PAYMASTER_BARS} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Paymaster Spend"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.spend_chart} xaxis={"DATE"} yaxis={"GAS_SPENT"} segment={"PAYMASTER_NAME"} barConfig={PAYMASTER_BARS} usd={true} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Paymaster Spend Market Share"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.spend_chart} xaxis={"DATE"} yaxis={"GAS_SPENT"} segment={"PAYMASTER_NAME"} barConfig={PAYMASTER_BARS} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Sponsored vs ERC20 Paymaster Volume"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.spend_type_chart} xaxis={"DATE"} yaxis={"GAS_SPENT"} segment={"PAYMASTER_TYPE"} barConfig={PAYMASTER_TYPE_BARS} usd={true} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Sponsored vs ERC20 Paymaster Volume Marketshare"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.spend_type_chart} xaxis={"DATE"} yaxis={"GAS_SPENT"} segment={"PAYMASTER_TYPE"} barConfig={PAYMASTER_TYPE_BARS} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Active Accounts"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedLineChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"PAYMASTER_NAME"} lineConfig={PAYMASTER_LINES} />
                    </CardContent>
                </Card>

            </div>
            <Separator />
            <AboutBlock />
            <SiteFooter />
        </div>
    );
}

