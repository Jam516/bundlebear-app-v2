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
import { ChainBarChart } from "@/components/chain-bar-chart";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "BundleBear",
  description: "A dashboard tracking the adoption of ERC-4337 smart accounts.",
};

export default async function OverviewPage({ params }: { params: { slug: string[] } }) {

  const [chain = 'all', timeframe = 'week'] = Array.isArray(params.slug) ? params.slug : [];

  const data = await getOverviewData({ chain, timeframe });

  const titleparam =
    timeframe === 'day' ? 'Daily' :
      timeframe === 'month' ? 'Monthly' :
        'Weekly';

  const chainlabel = chain === 'all' ? " " : `${chain.charAt(0).toUpperCase() + chain.slice(1)} `;

  return (
    <div className="flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
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
            {chain != 'all' ? <SimpleBarChart data={data.monthly_active_accounts} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} /> : <ChainBarChart data={data.monthly_active_accounts} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"CHAIN"} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Sucessful UserOps"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.monthly_userops} xaxis={"DATE"} yaxis={"NUM_USEROPS"} /> : <ChainBarChart data={data.monthly_userops} xaxis={"DATE"} yaxis={"NUM_USEROPS"} segment={"CHAIN"} />}
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
              <ChainBarChart data={data.monthly_active_accounts} xaxis={"DATE"} yaxis={"NUM_ACCOUNTS"} segment={"CHAIN"} isPercentage={true} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{chainlabel + titleparam + " Sucessful UserOps Marketshare"}</CardTitle>
            </CardHeader>
            <CardContent className="pl-1">
              <ChainBarChart data={data.monthly_userops} xaxis={"DATE"} yaxis={"NUM_USEROPS"} segment={"CHAIN"} isPercentage={true} />
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
            {chain != 'all' ? <SimpleBarChart data={data.monthly_bundler_revenue} xaxis={"DATE"} yaxis={"REVENUE"} usd={true} /> : <ChainBarChart data={data.monthly_bundler_revenue} xaxis={"DATE"} yaxis={"REVENUE"} segment={"CHAIN"} usd={true} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{chainlabel + titleparam + " Paymaster Gas Spend"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-1">
            {chain != 'all' ? <SimpleBarChart data={data.monthly_paymaster_spend} xaxis={"DATE"} yaxis={"GAS_SPENT"} usd={true} /> : <ChainBarChart data={data.monthly_paymaster_spend} xaxis={"DATE"} yaxis={"GAS_SPENT"} segment={"CHAIN"} usd={true} />}
          </CardContent>
        </Card>
      </div>
      <Separator />
      <AboutBlock />
    </div>
  );
}

function AboutBlock() {
  return (
    <div className="grid gap-6 text-sm grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-left">
        <h2 className="font-bold ">What is an ERC-4337 smart wallet?</h2>
        <p>A smart contract wallet AKA smart wallet is a customizable Ethereum account. Smart wallets can be programmed with features like</p>
        <li>Batched transactions: Multiple actions, such as approving and swapping on a DEX, can be combined into one transaction.</li>
        <li>Gas fee abstraction: Users can transact without having to pay gas fees in the native token.</li>
        <li>Seedphrase-free security: Users can secure their wallets with verification methods that are easier and safer than seedphrases e.g. passkeys.</li>

      </div>
      <div className="flex flex-col items-left">
        <h2 className="font-bold ">What is a UserOperation (UserOp)?</h2>
        <p>UserOps are actions made by smart wallets. Bundlers bundle batches of UserOps into onchain transactions. Apps can use Paymasters to pay UserOp fees on behalf of their users</p>
      </div>
    </div>
  )
}

