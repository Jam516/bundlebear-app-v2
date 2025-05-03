import { getOverviewData } from "@/app/actions/getOverviewData"
import { Metadata } from "next";
import { StatCard } from "@/components/stat-card";
import { TimeSelect } from "@/components/time-select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UnifiedBarChart } from "@/components/unified-bar-chart";
import { CHAIN_BARS, ENGAGEMENT_BARS } from '@/components/bar-config';
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { Separator } from "@/components/ui/separator";
import { AboutBlock } from "@/components/about-block";
import { SiteFooter } from "@/components/footer";

type tParams = Promise<{ slug: string[] }>;

export const metadata: Metadata = {
  title: "BundleBear",
  description: "A dashboard tracking the adoption of EVM smart accounts.",
};

export default async function OverviewPage({ params }: { params: tParams }) {

  const parameters = await params;
  const [chain = 'all', timeframe = 'week'] = Array.isArray(parameters.slug) ? parameters.slug : [];

  const data = await getOverviewData({ chain, timeframe });

  const titleparam =
    timeframe === 'day' ? 'Daily' :
      timeframe === 'month' ? 'Monthly' :
        'Weekly';

  const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

  return (
    <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">ERC-4337 Metrics</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total UserOps"
          content={data.userops[0].NUM_USEROPS.toLocaleString()}
          subheader="UserOps"
          icon={
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          } />
        <StatCard
          title="Total Bundle Txns"
          content={data.transactions[0].NUM_TXNS.toLocaleString()}
          subheader="Transactions"
          icon={
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          } />
        <StatCard
          title="Total Paymaster Volume"
          content={"$" + data.paymaster_spend[0].GAS_SPENT.toLocaleString()}
          subheader="Gas Covered"
          icon={
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          } />
      </div>
      <TimeSelect />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Active Smart Accounts"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.monthly_active_accounts} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} /> : <UnifiedBarChart data={data.monthly_active_accounts} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"CHAIN"} barConfig={CHAIN_BARS} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Sucessful UserOps"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.monthly_userops} xaxis={"DATE"} yaxis={"NUM_USEROPS"} /> : <UnifiedBarChart data={data.monthly_userops} xaxis={"DATE"} yaxis={"NUM_USEROPS"} segment={"CHAIN"} barConfig={CHAIN_BARS} />}
          </CardContent>
        </Card>
      </div>
      {chain === 'all' ?
        <div className="grid gap-4 grid-cols-1  md:grid-cols-2 ">
          <Card>
            <CardHeader>
              <CardTitle>{chainlabel + titleparam + " Active Smart Accounts Marketshare"}</CardTitle>
            </CardHeader>
            <CardContent className="pl-1">
              <UnifiedBarChart data={data.monthly_active_accounts} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"CHAIN"} barConfig={CHAIN_BARS} isPercentage={true} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{chainlabel + titleparam + " Sucessful UserOps Marketshare"}</CardTitle>
            </CardHeader>
            <CardContent className="pl-1">
              <UnifiedBarChart data={data.monthly_userops} xaxis={"DATE"} yaxis={"NUM_USEROPS"} segment={"CHAIN"} barConfig={CHAIN_BARS} isPercentage={true} />
            </CardContent>
          </Card>
        </div>
        :
        <div className="grid gap-4 grid-cols-1  md:grid-cols-2">

        </div>
      }
      {/* <div className="block container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Active Accounts by Userop Quantity"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            <SBACChart data={data.accounts_by_category} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"CATEGORY"} usd={false} />
          </CardContent>
        </Card>
      </div> */}
      <div className="grid gap-4  grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Bundler Revenue"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.monthly_bundler_revenue} xaxis={"DATE"} yaxis={"REVENUE"} usd={true} /> : <UnifiedBarChart data={data.monthly_bundler_revenue} xaxis={"DATE"} yaxis={"REVENUE"} segment={"CHAIN"} barConfig={CHAIN_BARS} usd={true} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Paymaster Gas Spend"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.monthly_paymaster_spend} xaxis={"DATE"} yaxis={"GAS_SPENT"} usd={true} /> : <UnifiedBarChart data={data.monthly_paymaster_spend} xaxis={"DATE"} yaxis={"GAS_SPENT"} segment={"CHAIN"} barConfig={CHAIN_BARS} usd={true} />}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4  grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + " Active Accounts by " + titleparam + " UserOps Made"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            <UnifiedBarChart data={data.accounts_by_category} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"CATEGORY"} barConfig={ENGAGEMENT_BARS} />
          </CardContent>
        </Card>

      </div>
      <Separator />
      <AboutBlock />
      <SiteFooter />
    </div>
  );
}

