import { Metadata } from "next";
import { getOverviewData7702 } from "@/app/actions/getOverviewData7702"
import { StatCard } from "@/components/stat-card";
import { TimeSelect } from "@/components/time-select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { UnifiedBarChart } from "@/components/unified-bar-chart";
import { UnifiedAreaChart } from "@/components/unified-area-chart";
import { UnifiedLineChart } from "@/components/unified-line-chart";
import { CHAIN_BARS_7702 } from '@/components/bar-config';
import { CHAIN_AREAS_7702 } from "@/components/area-config";
import { CHAIN_LINES_7702 } from "@/components/line-config";
import { TXN_TYPE_BARS_7702 } from "@/components/bar-config";
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
  const [chain = 'all', timeframe = 'week'] = Array.isArray(parameters.slug) ? parameters.slug : [];

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
          title="Currently Live Smart Accounts"
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
      <Separator />
      <p className="text-sm">The active account metrics track four types of onchain action:</p>
      <li className="text-sm"><strong>erc-4337 userops:</strong>Actions done using ERC-4337 UserOperations</li>
      <li className="text-sm"><strong>self-initiated txns:</strong> Transactions where the smart account runs its own code</li>
      <li className="text-sm"><strong>relayed actions:</strong> Actions initiated by a third-party wallet that calls the smart account&apos;s code (without using 4337)</li>
      <li className="text-sm"><strong>eoa txns:</strong> Regular transactions where the smart account didn&apos;t use its code</li>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Active Smart Accounts"}</CardTitle>
            <CardDescription>Smart accounts that are making UserOps and/or transactions</CardDescription>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.active_smart_wallets_chart} xaxis={"DATE"} yaxis={"ACTIVE_ACCOUNTS"} /> : <UnifiedLineChart data={data.active_smart_wallets_chart} xaxis={"DATE"} yaxis={"ACTIVE_ACCOUNTS"} segment={"CHAIN"} lineConfig={CHAIN_LINES_7702} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Smart Account Actions"}</CardTitle>
            <CardDescription>UserOps and transactions made by smart accounts</CardDescription>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.smart_wallet_actions} xaxis={"DATE"} yaxis={"NUM_ACTIONS"} /> : <UnifiedBarChart data={data.smart_wallet_actions} xaxis={"DATE"} yaxis={"NUM_ACTIONS"} segment={"CHAIN"} barConfig={CHAIN_BARS_7702} />}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Smart Account Actions by Type"}</CardTitle>
            <CardDescription>UserOps and transactions made by smart accounts</CardDescription>
          </CardHeader>
          <CardContent className="pl-1">
            <UnifiedBarChart data={data.smart_wallet_actions_type} xaxis={"DATE"} yaxis={"NUM_ACTIONS"} segment={"TYPE"} barConfig={TXN_TYPE_BARS_7702} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{"Live Smart Accounts"}</CardTitle>
            <CardDescription>Wallets that have an active 7702 authorization</CardDescription>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.live_smart_wallets_chart} xaxis={"DATE"} yaxis={"LIVE_SMART_WALLETS"} /> : <UnifiedLineChart data={data.live_smart_wallets_chart} xaxis={"DATE"} yaxis={"LIVE_SMART_WALLETS"} segment={"CHAIN"} lineConfig={CHAIN_LINES_7702} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{"In-use Authorized Contracts"}</CardTitle>
            <CardDescription>Contracts that are authorized by at least one wallet</CardDescription>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.live_authorized_contracts_chart} xaxis={"DATE"} yaxis={"LIVE_AUTHORIZED_CONTRACTS"} /> : <UnifiedAreaChart data={data.live_authorized_contracts_chart} xaxis={"DATE"} yaxis={"LIVE_AUTHORIZED_CONTRACTS"} segment={"CHAIN"} areaConfig={CHAIN_AREAS_7702} />}
          </CardContent>
        </Card>
      </div>
      {chain === 'all' ?
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{"Live Smart Accounts Market Share"}</CardTitle>
            </CardHeader>
            <CardContent className="pl-1">
              <UnifiedAreaChart data={data.live_smart_wallets_chart} xaxis={"DATE"} yaxis={"LIVE_SMART_WALLETS"} segment={"CHAIN"} areaConfig={CHAIN_AREAS_7702} isPercentage={true} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{"In-use Authorized Contracts Market Share"}</CardTitle>
            </CardHeader>
            <CardContent className="pl-1">
              <UnifiedAreaChart data={data.live_authorized_contracts_chart} xaxis={"DATE"} yaxis={"LIVE_AUTHORIZED_CONTRACTS"} segment={"CHAIN"} areaConfig={CHAIN_AREAS_7702} isPercentage={true} />
            </CardContent>
          </Card>
        </div>
        :
        <div className="grid gap-4 grid-cols-1  md:grid-cols-2">

        </div>
      }

      <TimeSelect />
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
      {chain === 'all' ?
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{"Authorizations Market Share"}</CardTitle>
            </CardHeader>
            <CardContent className="pl-1">
              <UnifiedBarChart data={data.authorizations_chart} xaxis={"DATE"} yaxis={"NUM_AUTHORIZATIONS"} segment={"CHAIN"} barConfig={CHAIN_BARS_7702} isPercentage={true} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{"Set Code Transactions Market Share"}</CardTitle>
            </CardHeader>
            <CardContent className="pl-1">
              <UnifiedBarChart data={data.set_code_chart} xaxis={"DATE"} yaxis={"NUM_SET_CODE_TXNS"} segment={"CHAIN"} barConfig={CHAIN_BARS_7702} isPercentage={true} />
            </CardContent>
          </Card>
        </div>
        :
        <div className="grid gap-4 grid-cols-1  md:grid-cols-2">

        </div>
      }
      <Separator />
      <AboutBlock />
      <SiteFooter />
    </div>
  );
}

