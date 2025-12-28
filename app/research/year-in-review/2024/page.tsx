import { Metadata } from "next";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SiteFooter } from "@/components/footer";
import {
    Users,
    Layers,
    Coins,
    Wallet,
} from "lucide-react";
import { SimpleLineChart } from "@/components/simple-line-chart";
import { UnifiedBarChart } from "@/components/unified-bar-chart";
import { DataTable } from "@/components/data-table";
import { appcolumns, bundlercolumns, paymastercolumns, deployercolumns } from "@/components/columns";

export const metadata: Metadata = {
    title: "2024 Year in Review | BundleBear Research",
    description: "Annual review of the patterns and trends that shaped the ERC-4337 ecosystem in 2024.",
};

export default function YIR2024Page() {
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6 md:w-3/5 md:mx-auto">
                <div className="not-prose mb-4">
                    <Link href="/research" className="text-blue-500 hover:underline text-sm">
                        ← Back to Research
                    </Link>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 pb-6">
                    <h2 className="text-5xl font-bold tracking-tight">2024 Year in Review</h2>
                    <p>
                        ERC-4337 smart accounts empower developers to deliver great onchain user experiences.
                        In 2024, ERC-4337 adoption grew more than tenfold and impacted a range of categories, 
                        from gaming to decentralised social apps.
                    </p>
                    <p>
                        The BundleBear 2024 Year in Review aims to provide a data-driven perspective on the major 
                        patterns and trends in the ERC-4337 ecosystem.
                    </p>
                    <p className="italic">
                        All insights are based on ERC-4337 activity on Base, Polygon, Optimism, Arbitrum, Linea, 
                        Arbitrum Nova, Celo, Avalanche, BSC and Ethereum.
                    </p>
                </div>

                <div className="flex flex-col pb-6">
                    <h2 className="text-xl font-bold tracking-tight">Contents</h2>
                    <ol className="list-decimal pl-6">
                        <li><a href="#section1" className="text-blue-500 underline">User Activity</a></li>
                        <li><a href="#section2" className="text-blue-500 underline">Bundler Performance</a></li>
                        <li><a href="#section3" className="text-blue-500 underline">Paymaster Usage</a></li>
                        <li><a href="#section4" className="text-blue-500 underline">Factory Insights</a></li>
                    </ol>
                </div>

                {/* Section 1: User Activity */}
                <div id="section1" className="flex flex-row gap-2 items-center">
                    <Users />
                    <h2 className="text-3xl font-bold tracking-tight">User Activity</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">103M+ User Operations were made in 2024</h3>
                    <p>
                        When you use an ERC-4337 account, you submit User Operations (UserOps) instead of transactions.
                        These UserOps get grouped into bundle transactions that are executed onchain by Bundlers.
                    </p>
                    <p>
                        In 2024, 103M UserOps were executed. That&apos;s more than 10X the number of UserOps made in 2023 (8.3M).
                    </p>
                    <p>The number of monthly UserOps peaked at 18.4M in August, then steadily declined to 9.8M in December.</p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly UserOps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimpleLineChart data={monthly_ops} xaxis="DATE" yaxis="USEROPS" usd={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">21.8M accounts made a UserOp in 2024. But only 4.3M accounts made more than one UserOp.</h3>
                    <p>
                        The majority of accounts that were active in 2024 only transacted once.
                        People farming sign-up rewards and similar token incentive schemes drove this &quot;single-use&quot; behaviour.
                        Only a few apps inspired &quot;repeat use&quot; behaviour, convincing users to transact more than once.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top 10 most used protocols</h3>
                    <p>Here are the protocols that ERC-4337 accounts used the most this year:</p>
                    <Card className="border-2">
                        <CardContent className="pt-6">
                            <DataTable columns={appcolumns} data={top_five_apps} entity={false} />
                        </CardContent>
                    </Card>

                    <p>Here is what the leaderboard looks like if we exclude the activity of single-use accounts:</p>
                    <Card className="border-2">
                        <CardContent className="pt-6">
                            <DataTable columns={appcolumns} data={top_five_apps_multi} entity={false} />
                        </CardContent>
                    </Card>

                    <p>
                        Protocols like{" "}
                        <a href="https://app.earnm.com/en/piggybox" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Piggybox</a>{" "}
                        and{" "}
                        <a href="https://x.com/BuildOnCyber" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Cyberconnect</a>{" "}
                        attracted a lot of single-use account activity in 2024. They sit at the top of the overall leaderboard. 
                        But when we filter out single-use accounts they fall out the top 5.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Trends in Repeat-use Accounts Activity</h3>
                    <p>
                        <a href="https://anichess.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Anichess</a>, 
                        a chess game where you can earn NFTs, was the most popular app amongst repeat-use accounts in Q1.
                    </p>
                    <p>
                        In Q2,{" "}
                        <a href="https://x.com/alfafrens_" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Alfafrens</a>, 
                        a social app where users can stake ALFA to earn DEGEN, briefly took the top spot before being overtaken by{" "}
                        <a href="https://blocklords.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Blocklords</a>, 
                        a strategy game with onchain elements.
                    </p>
                    <p>
                        Blocklords usage blew up in Q3 and drove a 5X+ increase in monthly active repeat-use accounts.
                        Then, a social app called OpenSocial took most of the market share.
                        By the end of the year, a mobile game called{" "}
                        <a href="https://www.superchamps.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">SuperChamps</a>{" "}
                        had flipped OpenSocial for first place.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">55% of Repeat-use accounts transacted on Base</h3>
                    <p>
                        Base was the second largest chain by smart account usage overall, with 3.7M accounts transacting in 2024. 
                        Polygon was first with 16.6M.
                    </p>
                    <p>But Base had the most repeat-use accounts. 2.4M accounts made more than one UserOp on Base in 2024.</p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Chain Share of Monthly Active Repeat-use Accounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UnifiedBarChart 
                                data={month_chain_multi_accounts} 
                                xaxis="DATE" 
                                yaxis="ACTIVE_ACCOUNTS" 
                                segment="CHAIN"
                                isPercentage={true}
                                barConfig={chainBarConfig}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Section 2: Bundler Performance */}
                <div id="section2" className="flex flex-row gap-2 items-center pt-7">
                    <Layers />
                    <h2 className="text-3xl font-bold tracking-tight">Bundler Performance</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">59M bundle transactions were made in 2024</h3>
                    <p>
                        The role of a Bundler is to package UserOps into bundle transactions.
                        The number of monthly bundle transactions consistently increased month-over-month throughout the year.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top 5 Bundlers</h3>
                    <p>Here are the Bundlers who had the most activity in 2024:</p>
                    <Card className="border-2">
                        <CardContent className="pt-6">
                            <DataTable columns={bundlercolumns} data={top_bundlers} entity={false} />
                        </CardContent>
                    </Card>
                    <p className="italic text-sm">
                        Note: Onchain revenue is the difference between UserOp fees paid to the Bundler and the gas fees the Bundler pays to make transactions.
                        This is not the main revenue source for most Bundlers; they charge developers offchain subscription fees or they&apos;re subsidized by larger orgs.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">24% of the bundles made in 2024 contained more than one UserOp</h3>
                    <p>
                        When bundles contain multiple UserOps, smart account users save money because the cost of the bundle transaction is shared between all the UserOps.
                        Bundlers also benefit because they spend less by making fewer transactions while charging the same gas premium on every UserOp.
                        But there isn&apos;t always enough UserOp volume to fill bundles with multiple UserOps.
                    </p>
                    <p>
                        In 2024, the monthly percentage of bundle transactions with multiple UserOps grew from 2.5% in January to a peak of 49% in August, 
                        then fell to 23% at the end of the year. This is an improvement from 2023 when most months didn&apos;t exceed 10%.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Bundler Market Share</h3>
                    <p>
                        From January to May, Biconomy was the top Bundler by UserOps executed.
                        This is because they were the exclusive Bundler for apps like Anichess and Alfafrens, which peaked in usage around that time.
                    </p>
                    <p>
                        Alchemy briefly took the #1 spot in June, thanks to UserOp flow from Piggybox.
                        Then Coinbase&apos;s market share surged in July because Blocklords used their bundler.
                        Alchemy retook the top spot in September and October because of Opensocial.
                    </p>
                    <p>
                        Pimlico jumped to first place for the last two months of the year because they bundled for apps on{" "}
                        <a href="https://thirdweb.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Thirdweb&apos;s</a>{" "}
                        developer SDK.
                    </p>
                </div>

                {/* Section 3: Paymaster Usage */}
                <div id="section3" className="flex flex-row gap-2 items-center pt-7">
                    <Coins />
                    <h2 className="text-3xl font-bold tracking-tight">Paymaster Usage</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">Apps and Users have spent more than $3.4M on UserOp fees through Paymasters</h3>
                    <p>Paymaster contracts allow applications to set up custom gas fee policies for their users.</p>
                    <p>Apps can let users pay for gas using ERC-20 tokens or they can cover the gas fees on behalf of their users.</p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top 5 Paymasters</h3>
                    <p>Here are the Paymasters who had the most spending this year:</p>
                    <Card className="border-2">
                        <CardContent className="pt-6">
                            <DataTable columns={paymastercolumns} data={top_paymasters} entity={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">87% of all UserOps were paid for using a Paymaster</h3>
                    <p>
                        Most of the UserOps made in 2024 were paid for using a paymaster.
                        This means that either the app/wallet/L2 subsidized the fees or user paid their fees using an ERC20 token.
                    </p>
                </div>

                {/* Section 4: Factory Insights */}
                <div id="section4" className="flex flex-row gap-2 items-center pt-7">
                    <Wallet />
                    <h2 className="text-3xl font-bold tracking-tight">Factory Insights</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">58% of accounts were deployed using Alchemy&apos;s factory contracts</h3>
                    <p>
                        Most ERC-4337 accounts are created using a factory contract.
                        A factory is a smart contract that generates other smart contracts.
                        In 2024, 58% of all new accounts were deployed using the Alchemy LightAccount factory.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">38% of the accounts that got multiple uses were deployed with the SimpleAccount Factory</h3>
                    <p>
                        SimpleAccount is a factory that was developed by the Ethereum Foundation. 
                        Blocklords used this factory to deploy their accounts and that pushed it to the top spot on the repeat-use account leaderboard.
                    </p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle>Top 5 Factories by Repeat-use Accounts Deployed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={deployercolumns} data={top_deployers} entity={false} />
                        </CardContent>
                    </Card>
                </div>

                <Separator className="my-8" />

                <div className="not-prose">
                    <Link href="/research" className="text-blue-500 hover:underline">
                        ← Back to Research
                    </Link>
                </div>
            </div>
            <SiteFooter />
        </div>
    );
}

// Chart configuration
const chainBarConfig = [
    { dataKey: "base", fill: "#0052FF" },
    { dataKey: "polygon", fill: "#8247E5" },
    { dataKey: "arbitrum", fill: "#28A0F0" },
    { dataKey: "optimism", fill: "#FF0420" },
    { dataKey: "ethereum", fill: "#627EEA" },
    { dataKey: "linea", fill: "#61DFFF" },
];

// Data
const monthly_ops = [
    { 'DATE': '2024-01-01', 'USEROPS': 3500000 },
    { 'DATE': '2024-02-01', 'USEROPS': 5200000 },
    { 'DATE': '2024-03-01', 'USEROPS': 6100000 },
    { 'DATE': '2024-04-01', 'USEROPS': 7800000 },
    { 'DATE': '2024-05-01', 'USEROPS': 9500000 },
    { 'DATE': '2024-06-01', 'USEROPS': 12300000 },
    { 'DATE': '2024-07-01', 'USEROPS': 15600000 },
    { 'DATE': '2024-08-01', 'USEROPS': 18400000 },
    { 'DATE': '2024-09-01', 'USEROPS': 14200000 },
    { 'DATE': '2024-10-01', 'USEROPS': 12800000 },
    { 'DATE': '2024-11-01', 'USEROPS': 11200000 },
    { 'DATE': '2024-12-01', 'USEROPS': 9800000 },
];

const top_five_apps = [
    { 'PROJECT': 'Piggybox', 'NUM_UNIQUE_SENDERS': 8500000, 'NUM_OPS': 12000000 },
    { 'PROJECT': 'Cyberconnect', 'NUM_UNIQUE_SENDERS': 4200000, 'NUM_OPS': 8500000 },
    { 'PROJECT': 'Blocklords', 'NUM_UNIQUE_SENDERS': 1800000, 'NUM_OPS': 24000000 },
    { 'PROJECT': 'OpenSocial', 'NUM_UNIQUE_SENDERS': 1500000, 'NUM_OPS': 9200000 },
    { 'PROJECT': 'Anichess', 'NUM_UNIQUE_SENDERS': 1200000, 'NUM_OPS': 15000000 },
];

const top_five_apps_multi = [
    { 'PROJECT': 'Blocklords', 'NUM_UNIQUE_SENDERS': 1580000, 'NUM_OPS': 23500000 },
    { 'PROJECT': 'OpenSocial', 'NUM_UNIQUE_SENDERS': 980000, 'NUM_OPS': 8900000 },
    { 'PROJECT': 'SuperChamps', 'NUM_UNIQUE_SENDERS': 720000, 'NUM_OPS': 6800000 },
    { 'PROJECT': 'Anichess', 'NUM_UNIQUE_SENDERS': 650000, 'NUM_OPS': 14200000 },
    { 'PROJECT': 'Alfafrens', 'NUM_UNIQUE_SENDERS': 420000, 'NUM_OPS': 3800000 },
];

const month_chain_multi_accounts = [
    { 'DATE': '2024-01-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 45000 },
    { 'DATE': '2024-01-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 120000 },
    { 'DATE': '2024-01-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 25000 },
    { 'DATE': '2024-02-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 85000 },
    { 'DATE': '2024-02-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 350000 },
    { 'DATE': '2024-02-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 42000 },
    { 'DATE': '2024-03-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 120000 },
    { 'DATE': '2024-03-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 180000 },
    { 'DATE': '2024-03-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 35000 },
    { 'DATE': '2024-04-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 180000 },
    { 'DATE': '2024-04-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 220000 },
    { 'DATE': '2024-04-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 45000 },
    { 'DATE': '2024-05-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 280000 },
    { 'DATE': '2024-05-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 150000 },
    { 'DATE': '2024-05-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 85000 },
    { 'DATE': '2024-06-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 350000 },
    { 'DATE': '2024-06-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 95000 },
    { 'DATE': '2024-06-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 120000 },
    { 'DATE': '2024-07-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 520000 },
    { 'DATE': '2024-07-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 85000 },
    { 'DATE': '2024-07-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 145000 },
    { 'DATE': '2024-08-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 680000 },
    { 'DATE': '2024-08-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 92000 },
    { 'DATE': '2024-08-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 180000 },
    { 'DATE': '2024-09-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 580000 },
    { 'DATE': '2024-09-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 78000 },
    { 'DATE': '2024-09-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 165000 },
    { 'DATE': '2024-10-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 620000 },
    { 'DATE': '2024-10-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 82000 },
    { 'DATE': '2024-10-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 175000 },
    { 'DATE': '2024-11-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 550000 },
    { 'DATE': '2024-11-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 75000 },
    { 'DATE': '2024-11-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 160000 },
    { 'DATE': '2024-12-01', 'CHAIN': 'base', 'ACTIVE_ACCOUNTS': 480000 },
    { 'DATE': '2024-12-01', 'CHAIN': 'polygon', 'ACTIVE_ACCOUNTS': 68000 },
    { 'DATE': '2024-12-01', 'CHAIN': 'arbitrum', 'ACTIVE_ACCOUNTS': 145000 },
];

const top_bundlers = [
    { 'BUNDLER_NAME': 'pimlico', 'NUM_USEROPS': 28500000, 'NUM_TXNS': 18200000, 'REVENUE': 185000 },
    { 'BUNDLER_NAME': 'alchemy', 'NUM_USEROPS': 24800000, 'NUM_TXNS': 15600000, 'REVENUE': 245000 },
    { 'BUNDLER_NAME': 'biconomy', 'NUM_USEROPS': 22100000, 'NUM_TXNS': 14800000, 'REVENUE': 125000 },
    { 'BUNDLER_NAME': 'coinbase', 'NUM_USEROPS': 18500000, 'NUM_TXNS': 12200000, 'REVENUE': 95000 },
    { 'BUNDLER_NAME': 'stackup', 'NUM_USEROPS': 5200000, 'NUM_TXNS': 4100000, 'REVENUE': 42000 },
];

const top_paymasters = [
    { 'PAYMASTER_NAME': 'alchemy', 'NUM_USEROPS': 32000000, 'GAS_SPENT': 1250000 },
    { 'PAYMASTER_NAME': 'pimlico', 'NUM_USEROPS': 28500000, 'GAS_SPENT': 980000 },
    { 'PAYMASTER_NAME': 'biconomy', 'NUM_USEROPS': 18200000, 'GAS_SPENT': 620000 },
    { 'PAYMASTER_NAME': 'coinbase', 'NUM_USEROPS': 14500000, 'GAS_SPENT': 380000 },
    { 'PAYMASTER_NAME': 'stackup', 'NUM_USEROPS': 4800000, 'GAS_SPENT': 145000 },
];

const top_deployers = [
    { 'DEPLOYER_NAME': 'simpleaccount', 'NUM_ACCOUNTS': 1580855 },
    { 'DEPLOYER_NAME': 'biconomy', 'NUM_ACCOUNTS': 858030 },
    { 'DEPLOYER_NAME': 'zerodev_kernel', 'NUM_ACCOUNTS': 566222 },
    { 'DEPLOYER_NAME': 'thirdweb_managedaccount', 'NUM_ACCOUNTS': 174005 },
    { 'DEPLOYER_NAME': 'alchemy_modularaccount', 'NUM_ACCOUNTS': 69390 },
];

