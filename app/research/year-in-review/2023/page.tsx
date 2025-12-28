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
import { appcolumns, bundlercolumns, paymastermincolumns } from "@/components/columns";

export const metadata: Metadata = {
    title: "2023 Year in Review | BundleBear Research",
    description: "Annual review of the patterns and trends that shaped the ERC-4337 ecosystem in 2023.",
};

export default function YIR2023Page() {
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6 md:w-3/5 md:mx-auto">
                <div className="not-prose mb-4">
                    <Link href="/research" className="text-blue-500 hover:underline text-sm">
                        ← Back to Research
                    </Link>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 pb-6">
                    <h2 className="text-5xl font-bold tracking-tight">2023 Year in Review</h2>
                    <p>
                        This year, ERC-4337 massively accelerated the pace of innovation in the account abstraction field.
                        The BundleBear 2023 Year in Review aims to provide a data-driven perspective on the major patterns 
                        and trends within the ERC-4337 smart accounts category.
                        All insights are based on ERC-4337 activity on Polygon, Optimism, Arbitrum, Base and Ethereum.
                    </p>
                </div>

                <div className="flex flex-col pb-6">
                    <h2 className="text-xl font-bold tracking-tight">Contents</h2>
                    <ol className="list-decimal pl-6">
                        <li><a href="#section1" className="text-blue-500 underline">User Insights</a></li>
                        <li><a href="#section2" className="text-blue-500 underline">Bundler Performance</a></li>
                        <li><a href="#section3" className="text-blue-500 underline">Paymaster Activity</a></li>
                        <li><a href="#section4" className="text-blue-500 underline">Factories and Wallets</a></li>
                    </ol>
                </div>

                {/* Section 1: User Insights */}
                <div id="section1" className="flex flex-row gap-2 items-center">
                    <Users />
                    <h2 className="text-3xl font-bold tracking-tight">User Insights</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">7.9M+ User Operations were made in 2023</h3>
                    <p>
                        When you use an ERC-4337 account, you submit User Operations (UserOps) instead of transactions.
                        These UserOps get grouped into bundle transactions that are executed onchain by Bundlers.
                    </p>
                    <p>The number of monthly UserOps reached a peak of 2.7M in October, then steadily declined to 880k in December.</p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly UserOps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimpleLineChart data={monthly_ops} xaxis="DATE" yaxis="USEROPS" usd={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">1.7M accounts made a UserOp in 2023</h3>
                    <p>The highest number of monthly active smart accounts occurred in November, when 450k accounts made at least one UserOp.</p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly Active Accounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimpleLineChart data={monthly_active_accounts} xaxis="DATE" yaxis="ACTIVES" usd={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top 10 most used protocols</h3>
                    <p>Here are the protocols that ERC-4337 accounts used the most this year:</p>
                    <Card className="border-2">
                        <CardContent className="pt-6">
                            <DataTable columns={appcolumns} data={top_five_apps} entity={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">85% of all UserOps were made on Polygon this year</h3>
                    <p>Polygon had the highest number of active ERC-4337 accounts this year for two reasons:</p>
                    <ul className="list-disc pl-6">
                        <li>The three most popular apps for 4337 users, CyberConnect, Grindery, and FanTV, were all deployed on Polygon.</li>
                        <li>
                            It is much cheaper to deploy and use 4337 accounts on Polygon compared to other chains and L2s. 
                            For more insights on smart account costs, check out our{" "}
                            <Link href="/research/gas-cost" className="text-blue-500 underline">cost analysis research report</Link>.
                        </li>
                    </ul>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Chains Share of Monthly UserOps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UnifiedBarChart 
                                data={month_chain_ops} 
                                xaxis="DATE" 
                                yaxis="NUM_USEROPS" 
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
                    <h3 className="text-xl font-bold tracking-tight pt-6">5.4M bundle transactions were made in 2023</h3>
                    <p>
                        The role of a Bundler is to package UserOps into bundle transactions.
                        The number of monthly bundle transactions consistently increased month-over-month throughout the year.
                    </p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly Bundle Transactions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimpleLineChart data={monthly_txns} xaxis="DATE" yaxis="NUM_TRANSACTIONS" usd={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top 5 Bundlers</h3>
                    <p>Here are the Bundlers who had the most activity in 2023:</p>
                    <Card className="border-2">
                        <CardContent className="pt-6">
                            <DataTable columns={bundlercolumns} data={top_bundlers} entity={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">86% of the bundles made in 2023 only contained 1 UserOp</h3>
                    <p>
                        When bundles contain multiple UserOps, smart account users save money because the cost of the bundle transaction 
                        is shared between all the UserOps. Bundlers also benefit because they spend less by making fewer transactions 
                        while charging the same gas premium on every UserOp.
                    </p>
                    <p>Unfortunately, the number of bundles that contain only one UserOp still greatly exceeds the number of multi-UserOp bundles.</p>
                </div>

                {/* Section 3: Paymaster Activity */}
                <div id="section3" className="flex flex-row gap-2 items-center pt-7">
                    <Coins />
                    <h2 className="text-3xl font-bold tracking-tight">Paymaster Activity</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">Users and Apps have spent more than $1,000,000 on UserOp fees through Paymasters</h3>
                    <p>Paymaster contracts allow applications to set up custom gas fee policies for their users.</p>
                    <p>
                        Apps can let users pay for gas using ERC-20 tokens or they can cover the gas fees on behalf of their users.
                        Paymasters have processed nearly a million dollars in total spending, with monthly volume consistently 
                        increasing over the past four months.
                    </p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly Paymaster Volume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimpleLineChart data={monthly_paymaster} xaxis="DATE" yaxis="GAS_SPENT" usd={true} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top 5 Paymasters</h3>
                    <p>Here are the Paymasters who had the most volume this year:</p>
                    <Card className="border-2">
                        <CardContent className="pt-6">
                            <DataTable columns={paymastermincolumns} data={top_paymasters} entity={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">96.4% of all UserOps were paid for using a Paymaster</h3>
                    <p>
                        Most of the UserOps made in 2023 were paid for using a paymaster.
                        This means that either the user paid their fees using an ERC20 token or the app/wallet they were using subsidized the fees.
                    </p>
                </div>

                {/* Section 4: Factories and Wallets */}
                <div id="section4" className="flex flex-row gap-2 items-center pt-7">
                    <Wallet />
                    <h2 className="text-3xl font-bold tracking-tight">Factories and Wallets</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">84% of ERC-4337 accounts were deployed using the Zerodev and Biconomy factory contracts</h3>
                    <p>
                        Most accounts are created using a factory contract.
                        A factory is a smart contract that generates other smart contracts.
                        55% of all accounts were deployed using the Kernel factory created by Zerodev, and 29% were deployed 
                        using the Biconomy Account factory created by Biconomy.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Patch and CyberConnect Wallet were the most popular ERC-4337 wallets of 2023</h3>
                    <p>
                        In December, 18% of active accounts used Patch wallet. Patch is used by the Grindery telegram bot, 
                        and Grindery has been the primary driver of its growth. Additionally, in December, 25% of active accounts 
                        used CyberConnect&apos;s built-in wallet.
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

// Chart configuration for chains
const chainBarConfig = [
    { dataKey: "ethereum", fill: "#627EEA" },
    { dataKey: "polygon", fill: "#8247E5" },
    { dataKey: "arbitrum", fill: "#28A0F0" },
    { dataKey: "optimism", fill: "#FF0420" },
    { dataKey: "base", fill: "#0052FF" },
];

// Data
const monthly_ops = [
    { 'DATE': '2023-03-01', 'USEROPS': 603 },
    { 'DATE': '2023-04-01', 'USEROPS': 7123 },
    { 'DATE': '2023-05-01', 'USEROPS': 12388 },
    { 'DATE': '2023-06-01', 'USEROPS': 55971 },
    { 'DATE': '2023-07-01', 'USEROPS': 458103 },
    { 'DATE': '2023-08-01', 'USEROPS': 786657 },
    { 'DATE': '2023-09-01', 'USEROPS': 884590 },
    { 'DATE': '2023-10-01', 'USEROPS': 2677380 },
    { 'DATE': '2023-11-01', 'USEROPS': 1758815 },
    { 'DATE': '2023-12-01', 'USEROPS': 882371 }
];

const monthly_active_accounts = [
    { 'DATE': '2023-03-01', 'ACTIVES': 108 },
    { 'DATE': '2023-04-01', 'ACTIVES': 4680 },
    { 'DATE': '2023-05-01', 'ACTIVES': 3461 },
    { 'DATE': '2023-06-01', 'ACTIVES': 21765 },
    { 'DATE': '2023-07-01', 'ACTIVES': 293390 },
    { 'DATE': '2023-08-01', 'ACTIVES': 439396 },
    { 'DATE': '2023-09-01', 'ACTIVES': 144369 },
    { 'DATE': '2023-10-01', 'ACTIVES': 191611 },
    { 'DATE': '2023-11-01', 'ACTIVES': 450294 },
    { 'DATE': '2023-12-01', 'ACTIVES': 388617 }
];

const top_five_apps = [
    { 'PROJECT': 'CyberConnect', 'NUM_UNIQUE_SENDERS': 534968, 'NUM_OPS': 986149 },
    { 'PROJECT': 'xFANTV token', 'NUM_UNIQUE_SENDERS': 446375, 'NUM_OPS': 991284 },
    { 'PROJECT': 'G1 token', 'NUM_UNIQUE_SENDERS': 246107, 'NUM_OPS': 3377415 },
    { 'PROJECT': 'ZTX Hoodie NFT', 'NUM_UNIQUE_SENDERS': 211519, 'NUM_OPS': 216467 },
    { 'PROJECT': 'CYBER token', 'NUM_UNIQUE_SENDERS': 126448, 'NUM_OPS': 138777 },
    { 'PROJECT': 'Minishard NFT', 'NUM_UNIQUE_SENDERS': 64650, 'NUM_OPS': 79770 },
    { 'PROJECT': 'CapX', 'NUM_UNIQUE_SENDERS': 45847, 'NUM_OPS': 584220 },
    { 'PROJECT': 'CyberID NFT', 'NUM_UNIQUE_SENDERS': 25462, 'NUM_OPS': 26798 },
    { 'PROJECT': 'USDC', 'NUM_UNIQUE_SENDERS': 9738, 'NUM_OPS': 27030 },
    { 'PROJECT': 'CapX ID NFT', 'NUM_UNIQUE_SENDERS': 9454, 'NUM_OPS': 9522 }
];

const monthly_txns = [
    { 'DATE': '2023-03-01', 'NUM_TRANSACTIONS': 659 },
    { 'DATE': '2023-04-01', 'NUM_TRANSACTIONS': 7307 },
    { 'DATE': '2023-05-01', 'NUM_TRANSACTIONS': 12551 },
    { 'DATE': '2023-06-01', 'NUM_TRANSACTIONS': 56146 },
    { 'DATE': '2023-07-01', 'NUM_TRANSACTIONS': 459677 },
    { 'DATE': '2023-08-01', 'NUM_TRANSACTIONS': 668858 },
    { 'DATE': '2023-09-01', 'NUM_TRANSACTIONS': 690029 },
    { 'DATE': '2023-10-01', 'NUM_TRANSACTIONS': 1338144 },
    { 'DATE': '2023-11-01', 'NUM_TRANSACTIONS': 1365482 },
    { 'DATE': '2023-12-01', 'NUM_TRANSACTIONS': 783875 }
];

const top_bundlers = [
    { 'BUNDLER_NAME': 'pimlico', 'NUM_USEROPS': 4514902, 'NUM_TXNS': 2788440, 'REVENUE': 42269.21 },
    { 'BUNDLER_NAME': 'biconomy', 'NUM_USEROPS': 1717173, 'NUM_TXNS': 1729676, 'REVENUE': 1621.09 },
    { 'BUNDLER_NAME': 'alchemy', 'NUM_USEROPS': 807769, 'NUM_TXNS': 478636, 'REVENUE': 57333.15 },
    { 'BUNDLER_NAME': 'stackup', 'NUM_USEROPS': 318952, 'NUM_TXNS': 294002, 'REVENUE': 16574.37 },
    { 'BUNDLER_NAME': 'particle', 'NUM_USEROPS': 8255, 'NUM_TXNS': 8564, 'REVENUE': -74.70 }
];

const month_chain_ops = [
    { 'DATE': '2023-03-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 80 },
    { 'DATE': '2023-03-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 402 },
    { 'DATE': '2023-03-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 100 },
    { 'DATE': '2023-03-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 21 },
    { 'DATE': '2023-04-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 108 },
    { 'DATE': '2023-04-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 6521 },
    { 'DATE': '2023-04-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 456 },
    { 'DATE': '2023-04-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 38 },
    { 'DATE': '2023-05-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 11279 },
    { 'DATE': '2023-05-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 943 },
    { 'DATE': '2023-05-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 70 },
    { 'DATE': '2023-05-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 96 },
    { 'DATE': '2023-06-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 53209 },
    { 'DATE': '2023-06-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 2194 },
    { 'DATE': '2023-06-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 469 },
    { 'DATE': '2023-06-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 99 },
    { 'DATE': '2023-07-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 442795 },
    { 'DATE': '2023-07-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 5459 },
    { 'DATE': '2023-07-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 1542 },
    { 'DATE': '2023-07-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 8306 },
    { 'DATE': '2023-07-01', 'CHAIN': 'base', 'NUM_USEROPS': 1 },
    { 'DATE': '2023-08-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 91773 },
    { 'DATE': '2023-08-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 240335 },
    { 'DATE': '2023-08-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 1111 },
    { 'DATE': '2023-08-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 422884 },
    { 'DATE': '2023-08-01', 'CHAIN': 'base', 'NUM_USEROPS': 30554 },
    { 'DATE': '2023-09-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 812305 },
    { 'DATE': '2023-09-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 33394 },
    { 'DATE': '2023-09-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 33457 },
    { 'DATE': '2023-09-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 613 },
    { 'DATE': '2023-09-01', 'CHAIN': 'base', 'NUM_USEROPS': 4821 },
    { 'DATE': '2023-10-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 2615502 },
    { 'DATE': '2023-10-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 29619 },
    { 'DATE': '2023-10-01', 'CHAIN': 'base', 'NUM_USEROPS': 3376 },
    { 'DATE': '2023-10-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 28174 },
    { 'DATE': '2023-10-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 709 },
    { 'DATE': '2023-11-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 1638941 },
    { 'DATE': '2023-11-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 37285 },
    { 'DATE': '2023-11-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 75179 },
    { 'DATE': '2023-11-01', 'CHAIN': 'base', 'NUM_USEROPS': 5356 },
    { 'DATE': '2023-11-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 2054 },
    { 'DATE': '2023-12-01', 'CHAIN': 'polygon', 'NUM_USEROPS': 720154 },
    { 'DATE': '2023-12-01', 'CHAIN': 'arbitrum', 'NUM_USEROPS': 104266 },
    { 'DATE': '2023-12-01', 'CHAIN': 'ethereum', 'NUM_USEROPS': 4942 },
    { 'DATE': '2023-12-01', 'CHAIN': 'optimism', 'NUM_USEROPS': 40842 },
    { 'DATE': '2023-12-01', 'CHAIN': 'base', 'NUM_USEROPS': 12167 }
];

const monthly_paymaster = [
    { 'DATE': '2023-03-01', 'GAS_SPENT': 617.59 },
    { 'DATE': '2023-04-01', 'GAS_SPENT': 2907.27 },
    { 'DATE': '2023-05-01', 'GAS_SPENT': 3425.45 },
    { 'DATE': '2023-06-01', 'GAS_SPENT': 5121.33 },
    { 'DATE': '2023-07-01', 'GAS_SPENT': 49268.02 },
    { 'DATE': '2023-08-01', 'GAS_SPENT': 358457.57 },
    { 'DATE': '2023-09-01', 'GAS_SPENT': 41634.33 },
    { 'DATE': '2023-10-01', 'GAS_SPENT': 62725.94 },
    { 'DATE': '2023-11-01', 'GAS_SPENT': 151617.72 },
    { 'DATE': '2023-12-01', 'GAS_SPENT': 327385.13 }
];

const top_paymasters = [
    { 'PAYMASTER_NAME': 'pimlico', 'GAS_SPENT': 294075.32 },
    { 'PAYMASTER_NAME': 'stackup', 'GAS_SPENT': 290258.17 },
    { 'PAYMASTER_NAME': 'alchemy', 'GAS_SPENT': 262198.06 },
    { 'PAYMASTER_NAME': 'biconomy', 'GAS_SPENT': 53397.79 },
    { 'PAYMASTER_NAME': 'blocto', 'GAS_SPENT': 1018.17 }
];

