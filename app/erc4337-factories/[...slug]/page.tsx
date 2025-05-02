import { getDeployerData } from "@/app/actions/getDeployerData";
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
import { FACTORY_BARS } from '@/components/bar-config';
import { deployercolumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
    title: "BundleBear Factory Metrics",
    description: "A dashboard tracking the activity of ERC-4337 Factories.",
};

export default async function FactoryPage({ params }: { params: tParams }) {

    const parameters = await params;
    const [chain = 'all', timeframe = 'week'] = Array.isArray(parameters.slug) ? parameters.slug : [];

    const data = await getDeployerData({ chain, timeframe });

    const titleparam =
        timeframe === 'day' ? 'Daily' :
            timeframe === 'month' ? 'Monthly' :
                'Weekly';

    const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

    return (
        <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Account Factories</h2>
            </div>
            <div className="flex justify-center">
                <DataTable columns={deployercolumns} data={data.leaderboard} entity={false} />
            </div>
            <TimeSelect />
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
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Active Accounts"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"FACTORY_NAME"} barConfig={FACTORY_BARS} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Active Accounts Market Share"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <UnifiedBarChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"FACTORY_NAME"} barConfig={FACTORY_BARS} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <Separator />
            <AboutBlock />
            <SiteFooter />
        </div>
    );
}

