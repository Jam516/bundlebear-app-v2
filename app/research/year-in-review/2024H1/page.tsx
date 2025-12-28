import { Metadata } from "next";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SiteFooter } from "@/components/footer";
import {
    Users,
    Activity,
    Coins,
} from "lucide-react";
import { UnifiedBarChart } from "@/components/unified-bar-chart";
import { DataTable } from "@/components/data-table";
import { appcolumns } from "@/components/columns";

export const metadata: Metadata = {
    title: "2024 Half-Year Report | BundleBear Research",
    description: "Semiannual review of the patterns and trends that shaped the ERC-4337 ecosystem in the first half of 2024.",
};

export default function YIR2024H1Page() {
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6 md:w-3/5 md:mx-auto">
                <div className="not-prose mb-4">
                    <Link href="/research" className="text-blue-500 hover:underline text-sm">
                        ← Back to Research
                    </Link>
                </div>

                <div className="flex flex-col items-center space-y-2 pb-6">
                    <h2 className="text-5xl font-bold tracking-tight">2024 Half-Year Report</h2>
                    <p>
                        Ever since the launch of the ERC-4337 standard in April 2023, more than 8 million accounts have been created 
                        and they&apos;ve made 28 million user operations (UserOps). The BundleBear 2024 Half-Year Report aims to push 
                        past vanity metrics and offer deeper insight into how many &quot;valuable users&quot; are present in the ERC-4337 
                        ecosystem and what those users are doing.
                    </p>
                    <div>
                        <p>One way to segment accounts by &quot;value&quot; is to look at how often they transact. In this report, I will categorise smart accounts as follows:</p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>Light users = 1 UserOp a month</li>
                            <li>Medium users = 2 to 10 UserOps a month</li>
                            <li>Heavy users = More than 10 UserOps a month</li>
                        </ul>
                    </div>
                    <p className="italic">
                        The BundleBear dataset includes all the ERC-4337 activity on Polygon, Optimism, Arbitrum, Base, Ethereum and Avalanche.
                    </p>
                </div>

                <div className="flex flex-col pb-6">
                    <h2 className="text-xl font-bold tracking-tight">Contents</h2>
                    <ol className="list-decimal pl-6">
                        <li><a href="#section1" className="text-blue-500 underline">Where are the Heavy Users?</a></li>
                        <li><a href="#section2" className="text-blue-500 underline">What are the Heavy Users doing?</a></li>
                        <li><a href="#section3" className="text-blue-500 underline">What&apos;s the economic impact of ERC-4337?</a></li>
                    </ol>
                </div>

                {/* Section 1: Where are the Heavy Users? */}
                <div id="section1" className="flex flex-row gap-2 items-center">
                    <Users />
                    <h2 className="text-3xl font-bold tracking-tight">Where are the Heavy Users?</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-2">3% of monthly active accounts are Heavy users (10+ UserOps/month)</h3>
                    <p className="italic">Based on the past 3-month average</p>
                    <p>91% of monthly active accounts are Light Users (1 UserOp/month). 6% are medium users (2-10 UserOps/month)</p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly Active Accounts by Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UnifiedBarChart 
                                data={monthly_ops_category} 
                                xaxis="DATE" 
                                yaxis="NUM_ACCOUNTS" 
                                segment="CATEGORY"
                                isPercentage={true}
                                barConfig={categoryBarConfig}
                            />
                        </CardContent>
                    </Card>

                    <p>There are fewer heavily-used ERC-4337 accounts than heavily-used EOA wallets. 52% of monthly active EOA wallets make more than one transaction per month.</p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Base has the most monthly Heavy Users</h3>
                    <p className="italic">Based on the past 3-month average</p>
                    <p>
                        In June 2024, Base had 74% of the monthly active Heavy Users (10+ UserOps/month).
                        Polygon was second with 13%, and Arbitrum was third with 9%.
                        This was a massive shift in the rankings because, up until May 2024, Polygon had been the consistent market leader in this category.
                    </p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly Heavy Users by Chain</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UnifiedBarChart 
                                data={heavy_users_chain} 
                                xaxis="DATE" 
                                yaxis="NUM_ACCOUNTS" 
                                segment="CHAIN"
                                isPercentage={true}
                                barConfig={chainBarConfig}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Section 2: What are the Heavy Users doing? */}
                <div id="section2" className="flex flex-row gap-2 items-center pt-7">
                    <Activity />
                    <h2 className="text-3xl font-bold tracking-tight">What are the Heavy Users doing?</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-2">Top 5 apps used by Heavy Users (Past 6 months)</h3>
                    <DataTable columns={appcolumns} data={heavy_users_app_table} entity={false} />
                    <p>
                        In Q1 2024, the most popular activity for Heavy User accounts was farming NFTs on{" "}
                        <a href="https://anichess.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Anichess</a>, 
                        a free-to-play chess game. Then in May,{" "}
                        <a href="https://www.alfafrens.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Alfafrens</a>, 
                        a SocialFi app where users are streamed ALFA tokens using Superfluid and pay transaction fees in DEGEN, 
                        briefly became the #1 app for power users.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top 5 apps used by Medium Users (Past 6 months)</h3>
                    <DataTable columns={appcolumns} data={medium_users_app_table} entity={false} />
                    <p>
                        In Q4 of 2023,{" "}
                        <a href="https://fantv.world/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">FanTV</a>{" "}
                        (a watch-to-earn India-focused streaming service) and{" "}
                        <a href="https://www.capxai.org/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">CapX</a>{" "}
                        (users complete quests to earn tokens) were the most popular apps amongst Medium Users.
                        In the first half of 2024, Anichess claimed the top spot, similar to what we saw with the Heavy users. 
                        FanTV briefly retook the top spot in April 2024 before being surpassed by Anichess again.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top 5 apps used by Light Users (Past 6 months)</h3>
                    <DataTable columns={appcolumns} data={light_users_app_table} entity={false} />
                    <p>
                        <a href="https://x.com/cyberconnecthq" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Cyberconnect</a>{" "}
                        (a crypto social app where every profile is a smart account) and FanTV drove most of the Light User activity in Q4 2023. 
                        In February 2024, Cyberconnect edged out FanTV and took the top spot by a wide margin.
                        Then, Piggybox NFT rapidly grew to eclipse all other apps used by this demographic.
                        Users receive these NFTs when they sign up for{" "}
                        <a href="https://app.earnm.com/en/piggybox" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">EARN&apos;M</a>, 
                        an app where you farm tokens by completing tasks like using different apps and following projects on Twitter.
                    </p>
                </div>

                {/* Section 3: Economic Impact */}
                <div id="section3" className="flex flex-row gap-2 items-center pt-7">
                    <Coins />
                    <h2 className="text-3xl font-bold tracking-tight">Economic Impact</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-2">$9.2M of tokens are held by ERC-4337 accounts</h3>
                    <p className="italic">Based on wallet balances for Base, Polygon, Arbitrum, Optimism and Ethereum</p>
                    <p>
                        Ethereum is currently the top chain by ERC-4337 TVL with more than $6M of funds held.
                        Polygon is a distant second with $1.6M, followed by Arbitrum with $1M.
                        Base is fourth with $273k and Optimism is last with $183k.
                        This is interesting because Ethereum has less ERC-4337 activity than the other chains in the dataset, 
                        but the average account on Ethereum is wealthier than the average account on its L2s.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">35% of ERC-4337 TVL is in rsETH</h3>
                    <p>
                        More than 1,000 accounts on Ethereum hold a total of $3.2M rsETH, making it the #1 token contributing to ERC-4337 TVL.
                        WAVX holds the #2 spot. The catch is that all $1.36M of WAVX is held by a single account on Ethereum.
                        ETH is in third place with $1.16M held by more than 23,000 accounts across Optimism, Ethereum, Base, and Arbitrum.
                        USDT is in fourth place with $848k held by over 11,000 accounts on Arbitrum, Polygon, Ethereum, and Optimism.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">75% of accounts with non-zero balances hold less than $10</h3>
                    <p>
                        Out of the ~55,000 smart accounts with non-zero balances, 2% hold more than $1000.
                        This small group of $1000+ accounts is responsible for 86% of ERC-4337 TVL.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">99.4% of the deployed accounts currently don&apos;t hold any funds</h3>
                    <p className="italic">(or at least don&apos;t hold tokens for which we have price data)</p>
                    <p>
                        This makes sense when you consider that most ERC-4337 activity is driven by free apps. 
                        For example, creating a profile on Cyberconnect or claiming an Anichess NFT with your gas sponsored by the app 
                        doesn&apos;t require you to fund your account. Or you might be using an app like FanTV where you claim a token 
                        that can only be used for in-app activities and isn&apos;t traded on DEXs.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">ERC-4337 usage has consumed $3.2M of Gas Fees</h3>
                    <p className="italic">Based on the price of ETH/MATIC/AVAX at time of transaction</p>
                    <p>
                        Ethereum is the top chain by ERC-4337 bundler gas spend. Bundlers have spent over $1M bundling UserOps into 
                        transactions on Ethereum. Given Ethereum&apos;s higher gas fees compared to the L2s and alt-L1s in the dataset, 
                        it&apos;s not surprising it took the #1 spot. Base ranks second for ERC-4337 gas spending with $745K, 
                        and Arbitrum is third with $450K.
                    </p>
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

// Chart configurations
const categoryBarConfig = [
    { dataKey: "01 UserOp", fill: "#90C2E7" },
    { dataKey: "02-10 UserOps", fill: "#4A90A4" },
    { dataKey: "More than 10 UserOps", fill: "#1E5F74" },
];

const chainBarConfig = [
    { dataKey: "ETHEREUM", fill: "#627EEA" },
    { dataKey: "POLYGON", fill: "#8247E5" },
    { dataKey: "ARBITRUM", fill: "#28A0F0" },
    { dataKey: "OPTIMISM", fill: "#FF0420" },
    { dataKey: "BASE", fill: "#0052FF" },
    { dataKey: "AVALANCHE", fill: "#E84142" },
];

// Data
const monthly_ops_category = [
    { "MONTH": "2023-10-01", "DATE": "2023-10-01", "CATEGORY": "01 UserOp", "NUM_ACCOUNTS": 130233 },
    { "MONTH": "2023-10-01", "DATE": "2023-10-01", "CATEGORY": "02-10 UserOps", "NUM_ACCOUNTS": 42470 },
    { "MONTH": "2023-10-01", "DATE": "2023-10-01", "CATEGORY": "More than 10 UserOps", "NUM_ACCOUNTS": 20717 },
    { "MONTH": "2023-11-01", "DATE": "2023-11-01", "CATEGORY": "01 UserOp", "NUM_ACCOUNTS": 346773 },
    { "MONTH": "2023-11-01", "DATE": "2023-11-01", "CATEGORY": "More than 10 UserOps", "NUM_ACCOUNTS": 8604 },
    { "MONTH": "2023-11-01", "DATE": "2023-11-01", "CATEGORY": "02-10 UserOps", "NUM_ACCOUNTS": 96468 },
    { "MONTH": "2023-12-01", "DATE": "2023-12-01", "CATEGORY": "01 UserOp", "NUM_ACCOUNTS": 395381 },
    { "MONTH": "2023-12-01", "DATE": "2023-12-01", "CATEGORY": "More than 10 UserOps", "NUM_ACCOUNTS": 5474 },
    { "MONTH": "2023-12-01", "DATE": "2023-12-01", "CATEGORY": "02-10 UserOps", "NUM_ACCOUNTS": 35434 },
    { "MONTH": "2024-01-01", "DATE": "2024-01-01", "CATEGORY": "More than 10 UserOps", "NUM_ACCOUNTS": 37120 },
    { "MONTH": "2024-01-01", "DATE": "2024-01-01", "CATEGORY": "02-10 UserOps", "NUM_ACCOUNTS": 57583 },
    { "MONTH": "2024-01-01", "DATE": "2024-01-01", "CATEGORY": "01 UserOp", "NUM_ACCOUNTS": 457792 },
    { "MONTH": "2024-02-01", "DATE": "2024-02-01", "CATEGORY": "02-10 UserOps", "NUM_ACCOUNTS": 301818 },
    { "MONTH": "2024-02-01", "DATE": "2024-02-01", "CATEGORY": "01 UserOp", "NUM_ACCOUNTS": 571746 },
    { "MONTH": "2024-02-01", "DATE": "2024-02-01", "CATEGORY": "More than 10 UserOps", "NUM_ACCOUNTS": 62702 },
    { "MONTH": "2024-03-01", "DATE": "2024-03-01", "CATEGORY": "02-10 UserOps", "NUM_ACCOUNTS": 47067 },
    { "MONTH": "2024-03-01", "DATE": "2024-03-01", "CATEGORY": "More than 10 UserOps", "NUM_ACCOUNTS": 48897 },
    { "MONTH": "2024-03-01", "DATE": "2024-03-01", "CATEGORY": "01 UserOp", "NUM_ACCOUNTS": 520770 },
    { "MONTH": "2024-04-01", "DATE": "2024-04-01", "CATEGORY": "01 UserOp", "NUM_ACCOUNTS": 585287 },
    { "MONTH": "2024-04-01", "DATE": "2024-04-01", "CATEGORY": "More than 10 UserOps", "NUM_ACCOUNTS": 46170 },
    { "MONTH": "2024-04-01", "DATE": "2024-04-01", "CATEGORY": "02-10 UserOps", "NUM_ACCOUNTS": 81030 },
    { "MONTH": "2024-05-01", "DATE": "2024-05-01", "CATEGORY": "01 UserOp", "NUM_ACCOUNTS": 1530864 },
    { "MONTH": "2024-05-01", "DATE": "2024-05-01", "CATEGORY": "More than 10 UserOps", "NUM_ACCOUNTS": 21720 },
    { "MONTH": "2024-05-01", "DATE": "2024-05-01", "CATEGORY": "02-10 UserOps", "NUM_ACCOUNTS": 78727 },
    { "MONTH": "2024-06-01", "DATE": "2024-06-01", "CATEGORY": "More than 10 UserOps", "NUM_ACCOUNTS": 14962 },
    { "MONTH": "2024-06-01", "DATE": "2024-06-01", "CATEGORY": "02-10 UserOps", "NUM_ACCOUNTS": 52659 },
    { "MONTH": "2024-06-01", "DATE": "2024-06-01", "CATEGORY": "01 UserOp", "NUM_ACCOUNTS": 2499587 },
];

const heavy_users_chain = [
    { "MONTH": "2024-01-01", "DATE": "2024-01-01", "CHAIN": "POLYGON", "NUM_ACCOUNTS": 35450 },
    { "MONTH": "2024-01-01", "DATE": "2024-01-01", "CHAIN": "ARBITRUM", "NUM_ACCOUNTS": 721 },
    { "MONTH": "2024-01-01", "DATE": "2024-01-01", "CHAIN": "AVALANCHE", "NUM_ACCOUNTS": 466 },
    { "MONTH": "2024-01-01", "DATE": "2024-01-01", "CHAIN": "OPTIMISM", "NUM_ACCOUNTS": 245 },
    { "MONTH": "2024-01-01", "DATE": "2024-01-01", "CHAIN": "ETHEREUM", "NUM_ACCOUNTS": 130 },
    { "MONTH": "2024-01-01", "DATE": "2024-01-01", "CHAIN": "BASE", "NUM_ACCOUNTS": 108 },
    { "MONTH": "2024-02-01", "DATE": "2024-02-01", "CHAIN": "POLYGON", "NUM_ACCOUNTS": 61425 },
    { "MONTH": "2024-02-01", "DATE": "2024-02-01", "CHAIN": "AVALANCHE", "NUM_ACCOUNTS": 422 },
    { "MONTH": "2024-02-01", "DATE": "2024-02-01", "CHAIN": "ARBITRUM", "NUM_ACCOUNTS": 393 },
    { "MONTH": "2024-02-01", "DATE": "2024-02-01", "CHAIN": "BASE", "NUM_ACCOUNTS": 170 },
    { "MONTH": "2024-02-01", "DATE": "2024-02-01", "CHAIN": "OPTIMISM", "NUM_ACCOUNTS": 159 },
    { "MONTH": "2024-02-01", "DATE": "2024-02-01", "CHAIN": "ETHEREUM", "NUM_ACCOUNTS": 133 },
    { "MONTH": "2024-03-01", "DATE": "2024-03-01", "CHAIN": "POLYGON", "NUM_ACCOUNTS": 46433 },
    { "MONTH": "2024-03-01", "DATE": "2024-03-01", "CHAIN": "BASE", "NUM_ACCOUNTS": 1117 },
    { "MONTH": "2024-03-01", "DATE": "2024-03-01", "CHAIN": "ARBITRUM", "NUM_ACCOUNTS": 601 },
    { "MONTH": "2024-03-01", "DATE": "2024-03-01", "CHAIN": "AVALANCHE", "NUM_ACCOUNTS": 398 },
    { "MONTH": "2024-03-01", "DATE": "2024-03-01", "CHAIN": "OPTIMISM", "NUM_ACCOUNTS": 240 },
    { "MONTH": "2024-03-01", "DATE": "2024-03-01", "CHAIN": "ETHEREUM", "NUM_ACCOUNTS": 108 },
    { "MONTH": "2024-04-01", "DATE": "2024-04-01", "CHAIN": "POLYGON", "NUM_ACCOUNTS": 42435 },
    { "MONTH": "2024-04-01", "DATE": "2024-04-01", "CHAIN": "BASE", "NUM_ACCOUNTS": 2450 },
    { "MONTH": "2024-04-01", "DATE": "2024-04-01", "CHAIN": "ARBITRUM", "NUM_ACCOUNTS": 735 },
    { "MONTH": "2024-04-01", "DATE": "2024-04-01", "CHAIN": "AVALANCHE", "NUM_ACCOUNTS": 320 },
    { "MONTH": "2024-04-01", "DATE": "2024-04-01", "CHAIN": "OPTIMISM", "NUM_ACCOUNTS": 163 },
    { "MONTH": "2024-04-01", "DATE": "2024-04-01", "CHAIN": "ETHEREUM", "NUM_ACCOUNTS": 67 },
    { "MONTH": "2024-05-01", "DATE": "2024-05-01", "CHAIN": "BASE", "NUM_ACCOUNTS": 10988 },
    { "MONTH": "2024-05-01", "DATE": "2024-05-01", "CHAIN": "POLYGON", "NUM_ACCOUNTS": 9468 },
    { "MONTH": "2024-05-01", "DATE": "2024-05-01", "CHAIN": "ARBITRUM", "NUM_ACCOUNTS": 633 },
    { "MONTH": "2024-05-01", "DATE": "2024-05-01", "CHAIN": "AVALANCHE", "NUM_ACCOUNTS": 351 },
    { "MONTH": "2024-05-01", "DATE": "2024-05-01", "CHAIN": "OPTIMISM", "NUM_ACCOUNTS": 212 },
    { "MONTH": "2024-05-01", "DATE": "2024-05-01", "CHAIN": "ETHEREUM", "NUM_ACCOUNTS": 68 },
    { "MONTH": "2024-06-01", "DATE": "2024-06-01", "CHAIN": "BASE", "NUM_ACCOUNTS": 11050 },
    { "MONTH": "2024-06-01", "DATE": "2024-06-01", "CHAIN": "POLYGON", "NUM_ACCOUNTS": 1967 },
    { "MONTH": "2024-06-01", "DATE": "2024-06-01", "CHAIN": "ARBITRUM", "NUM_ACCOUNTS": 1279 },
    { "MONTH": "2024-06-01", "DATE": "2024-06-01", "CHAIN": "AVALANCHE", "NUM_ACCOUNTS": 360 },
    { "MONTH": "2024-06-01", "DATE": "2024-06-01", "CHAIN": "OPTIMISM", "NUM_ACCOUNTS": 245 },
    { "MONTH": "2024-06-01", "DATE": "2024-06-01", "CHAIN": "ETHEREUM", "NUM_ACCOUNTS": 61 },
];

const heavy_users_app_table = [
    { "PROJECT": "Anichess Orb Token Claim", "NUM_UNIQUE_SENDERS": 64654, "NUM_OPS": 4594369 },
    { "PROJECT": "Degen", "NUM_UNIQUE_SENDERS": 10978, "NUM_OPS": 174212 },
    { "PROJECT": "Superfluid", "NUM_UNIQUE_SENDERS": 9405, "NUM_OPS": 1102769 },
    { "PROJECT": "ALFA", "NUM_UNIQUE_SENDERS": 9373, "NUM_OPS": 669326 },
    { "PROJECT": "DEGENx", "NUM_UNIQUE_SENDERS": 9181, "NUM_OPS": 49843 },
];

const medium_users_app_table = [
    { "PROJECT": "Anichess Orb Token Claim", "NUM_UNIQUE_SENDERS": 327699, "NUM_OPS": 1193252 },
    { "PROJECT": "xFANTV", "NUM_UNIQUE_SENDERS": 58220, "NUM_OPS": 131110 },
    { "PROJECT": "Hedgey Finance", "NUM_UNIQUE_SENDERS": 24555, "NUM_OPS": 49154 },
    { "PROJECT": "Safe4337Module", "NUM_UNIQUE_SENDERS": 12467, "NUM_OPS": 63542 },
    { "PROJECT": "OpenSocial", "NUM_UNIQUE_SENDERS": 8884, "NUM_OPS": 26230 },
];

const light_users_app_table = [
    { "PROJECT": "Piggybox", "NUM_UNIQUE_SENDERS": 3215288, "NUM_OPS": 3215543 },
    { "PROJECT": "Cyberconnect", "NUM_UNIQUE_SENDERS": 1478848, "NUM_OPS": 1480664 },
    { "PROJECT": "Burn Address", "NUM_UNIQUE_SENDERS": 621151, "NUM_OPS": 621179 },
    { "PROJECT": "xFANTV", "NUM_UNIQUE_SENDERS": 89688, "NUM_OPS": 91436 },
    { "PROJECT": "Anichess Orb Token Claim", "NUM_UNIQUE_SENDERS": 71747, "NUM_OPS": 80240 },
];

