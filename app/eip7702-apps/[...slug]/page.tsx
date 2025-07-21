import { getAppData7702 } from "@/app/actions/getAppData7702";
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
import { DynamicBarChart } from "@/components/dynamic-bar-chart";

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
    title: "BundleBear EIP-7702 App Metrics",
    description: "A dashboard tracking the app usage of EIP-7702 smart accounts.",
};

export default async function AppPage({ params }: { params: tParams }) {

    const parameters = await params;
    const [chain = 'all', timeframe = 'week'] = Array.isArray(parameters.slug) ? parameters.slug : [];

    const data = await getAppData7702({ chain, timeframe });

    const titleparam =
        timeframe === 'day' ? 'Daily' :
            timeframe === 'month' ? 'Monthly' :
                'Weekly';

    const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

    return (
        <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">EIP-7702 App Usage</h2>
            </div>
            <TimeSelect />
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Active Accounts (Excluding Hacked Wallets)"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart data={data.noncrime_usage_chart} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Account Market Share (Excluding Hacked Wallets)"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart data={data.noncrime_usage_chart} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Active Accounts"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart data={data.usage_chart} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>{chainlabel + titleparam + " Account Market Share"}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-1">
                        <DynamicBarChart data={data.usage_chart} isPercentage={true} />
                    </CardContent>
                </Card>
            </div>
            <Separator />
            <AboutBlock />
            <SiteFooter />
        </div>
    );
}

