import { getAuthContractData } from "@/app/actions/getAuthContractData";
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
import { DynamicAreaChart } from "@/components/dynamic-area-chart";
import { SimpleBarChart } from "@/components/simple-bar-chart";
// import { FACTORY_BARS } from '@/components/bar-config';
import { authcontractcolumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
    title: "BundleBear Authorized Contract Metrics",
    description: "A dashboard tracking the usage of EIP-7702 Authorized Contracts.",
};

export default async function AuthContractPage({ params }: { params: tParams }) {

    const parameters = await params;
    const [chain = 'all', timeframe = 'day'] = Array.isArray(parameters.slug) ? parameters.slug : [];

    const data = await getAuthContractData({ chain, timeframe });

    // const titleparam =
    //     timeframe === 'day' ? 'Daily' :
    //         timeframe === 'month' ? 'Monthly' :
    //             'Weekly';

    const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

    return (
        <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">EIP-7702 Authorized Contracts</h2>
            </div>
            <div className="flex justify-center mt-5">
                <h2 className="text-xl font-bold tracking-tight">Top 15 Authorized Contracts</h2>
            </div>
            <div className="flex justify-center">
                <DataTable columns={authcontractcolumns} data={data.leaderboard} entity={false} />
            </div>
            <div className="grid grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + " Live Smart Accounts by Authorized Contract"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicAreaChart data={data.live_smart_wallets_chart} />
                    </CardContent>
                </Card>

            </div>
            {/* <TimeSelect />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Accounts Deployed"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.deployments_chart} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"DEPLOYER_NAME"} barConfig={FACTORY_BARS} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Account Deployment Market Share"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.deployments_chart} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"DEPLOYER_NAME"} barConfig={FACTORY_BARS} isPercentage={true} />
                    </CardContent>
                </Card>
            </div> */}
            <Separator />
            <AboutBlock />
            <SiteFooter />
        </div>
    );
}

