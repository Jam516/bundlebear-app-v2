import { getActivationData } from "@/app/actions/getAccountActivationData";
import { Metadata } from "next";
import { TimeSelect } from "@/components/time-select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AboutBlock } from "@/components/about-block-7702";
import { SiteFooter } from "@/components/footer";
import { DynamicBarChart } from "@/components/dynamic-bar-chart-providers";

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
    title: "BundleBear ERC-4337 Account Activation Metrics",
    description: "A dashboard tracking the activation of ERC-4337 Accounts.",
};

export default async function ActivationPage({ params }: { params: tParams }) {

    const parameters = await params;
    const [chain = 'all', timeframe = 'week'] = Array.isArray(parameters.slug) ? parameters.slug : [];

    const data = await getActivationData({ chain, timeframe });

    const titleparam =
        timeframe === 'day' ? 'Daily' :
            timeframe === 'month' ? 'Monthly' :
                'Weekly';

    const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

    return (
        <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">ERC-4337 Account Activation</h2>
            </div>
            <Separator />
            <p className="text-sm">This page tracks account activations .ie the first time each account makes a UserOp. These new accounts are created in three main ways:</p>
            <li className="text-sm"><strong>Factory:</strong> Account deployed by factory contract.</li>
            <li className="text-sm"><strong>Safe4337Module:</strong> Safe accounts make UserOps using the 4337 plugin.</li>
            <li className="text-sm"><strong>EIP-7702:</strong> EOAs upgraded into ERC-4337 accounts using an EIP-7702 authorization.</li>
            <Separator />
            <TimeSelect />
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " New Accounts by Provider"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart data={data.new_users_chart} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " New Accounts Market Share by Provider"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart data={data.new_users_chart} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <Separator />
            <AboutBlock />
            <SiteFooter />
        </div>
    );
}

