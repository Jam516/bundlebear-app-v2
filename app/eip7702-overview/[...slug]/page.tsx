import { Metadata } from "next";
import { getOverviewData7702 } from "@/app/actions/getOverviewData7702"
import { StatCard } from "@/components/stat-card";
import { TimeSelect } from "@/components/time-select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UnifiedBarChart } from "@/components/unified-bar-chart";
import { UnifiedAreaChart } from "@/components/unified-area-chart";
import { CHAIN_BARS_7702 } from '@/components/bar-config';
import { CHAIN_AREAS_7702 } from "@/components/area-config";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { Separator } from "@/components/ui/separator";
import { AboutBlock } from "@/components/about-block-7702";
import { SiteFooter } from "@/components/footer";

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
  title: "BundleBear EIP-7702 Metrics",
  description: "A dashboard tracking the adoption of EIP-7702.",
};

export default async function OverviewPage7702({ params }: { params: tParams }) {

  const parameters = await params;
  const [chain = 'all', timeframe = 'day'] = Array.isArray(parameters.slug) ? parameters.slug : [];

  const data = await getOverviewData7702({ chain, timeframe });

  const titleparam =
    timeframe === 'day' ? 'Daily' :
      timeframe === 'month' ? 'Monthly' :
        'Weekly';

  const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

  return (
    <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">EIP-7702 Metrics</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Live Smart Accounts"
          content={data.stat_live_smart_wallets[0].LIVE_SMART_WALLETS.toLocaleString()}
          subheader="Smart Accounts"
          icon={
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          } />
        <StatCard
          title="Total Authorizations"
          content={data.stat_authorizations[0].NUM_AUTHORIZATIONS.toLocaleString()}
          subheader="Authorizations"
          icon={
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          } />
        <StatCard
          title="Total Set Code Txns"
          content={data.stat_set_code_txns[0].NUM_SET_CODE_TXNS.toLocaleString()}
          subheader="Transactions"
          icon={
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          } />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{"Live Smart Accounts"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.live_smart_wallets_chart} xaxis={"DATE"} yaxis={"LIVE_SMART_WALLETS"} /> : <UnifiedAreaChart data={data.live_smart_wallets_chart} xaxis={"DATE"} yaxis={"LIVE_SMART_WALLETS"} segment={"CHAIN"} areaConfig={CHAIN_AREAS_7702} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{"In-use Authorized Contracts"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.live_authorized_contracts_chart} xaxis={"DATE"} yaxis={"LIVE_AUTHORIZED_CONTRACTS"} /> : <UnifiedAreaChart data={data.live_authorized_contracts_chart} xaxis={"DATE"} yaxis={"LIVE_AUTHORIZED_CONTRACTS"} segment={"CHAIN"} areaConfig={CHAIN_AREAS_7702} />}
          </CardContent>
        </Card>
      </div>
      <p className="text-sm text-muted-foreground">Note: The number of live smart accounts will rise and fall over time as users sign authorizations that upgrade or downgrade their wallets.</p>
      <TimeSelect defaultTime="day" />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Authorizations"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.authorizations_chart} xaxis={"DATE"} yaxis={"NUM_AUTHORIZATIONS"} /> : <UnifiedBarChart data={data.authorizations_chart} xaxis={"DATE"} yaxis={"NUM_AUTHORIZATIONS"} segment={"CHAIN"} barConfig={CHAIN_BARS_7702} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Set Code Transactions"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.set_code_chart} xaxis={"DATE"} yaxis={"NUM_SET_CODE_TXNS"} /> : <UnifiedBarChart data={data.set_code_chart} xaxis={"DATE"} yaxis={"NUM_SET_CODE_TXNS"} segment={"CHAIN"} barConfig={CHAIN_BARS_7702} />}
          </CardContent>
        </Card>
      </div>
      <Separator />
      <AboutBlock />
      <SiteFooter />
    </div>
  );
}

