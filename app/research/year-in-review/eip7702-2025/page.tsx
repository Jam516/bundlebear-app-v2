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
    Shield,
    Zap,
} from "lucide-react";
import { SimpleLineChart } from "@/components/simple-line-chart";
import { UnifiedBarChart } from "@/components/unified-bar-chart";
import { SimplePieChart } from "@/components/simple-pie-chart";
import { DataTable } from "@/components/data-table";
import { authcontractcolumns } from "@/components/columns";

export const metadata: Metadata = {
    title: "EIP-7702 2025 Year in Review | BundleBear Research",
    description: "Annual review of the patterns and trends that shaped EIP-7702 smart account adoption in 2025.",
};

export default function EIP7702YIR2025Page() {
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6 md:w-3/5 md:mx-auto">
                <div className="not-prose mb-4">
                    <Link href="/research" className="text-blue-500 hover:underline text-sm">
                        ← Back to Research
                    </Link>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 pb-6">
                    <h2 className="text-5xl font-bold tracking-tight">EIP-7702 2025 Year in Review</h2>
                    <p>
                        EIP-7702 was activated on Ethereum mainnet in May 2025 as part of the Pectra upgrade.
                        It allows Externally Owned Accounts (EOAs) to adopt the code 
                        of smart contracts, enabling features like transaction batching, gas sponsorship, and 
                        custom authentication logic.
                    </p>
                    <p>
                        This report provides a data-driven analysis of EIP-7702 adoption patterns, authorized 
                        contract usage, and the intersection with ERC-4337 account abstraction.
                    </p>
                    <p className="italic">
                        All insights are based on EIP-7702 activity on Ethereum, Base, Arbitrum, Optimism, 
                        BSC, Polygon, Gnosis, and Unichain.
                    </p>
                </div>

                <div className="flex flex-col pb-6">
                    <h2 className="text-xl font-bold tracking-tight">Contents</h2>
                    <ol className="list-decimal pl-6">
                        <li><a href="#section1" className="text-blue-500 underline">Authorized Contracts</a></li>
                        <li><a href="#section2" className="text-blue-500 underline">User Activity</a></li>
                        <li><a href="#section3" className="text-blue-500 underline">7702 x 4337</a></li>
                    </ol>
                </div>

                {/* Section 1: Authorized Contracts */}
                <div id="section1" className="flex flex-row gap-2 items-center">
                    <Shield />
                    <h2 className="text-3xl font-bold tracking-tight">Authorized Contracts</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">6.7M+ EOAs have authorized a smart contract</h3>
                    <p>
                        When an EOA wallet creates an EIP-7702 authorization, it points it&apos;s &apos;delegation indicator&apos; to a specified smart contract. 
                        Then, when a CALL is made to that wallet, the authorized contract&apos;s code is executed in the context of the user&apos;s account.
                    </p>
                    <p>
                        At the end of 2025, over 6.6 million EOAs had an active authorization, with 91 million 
                        total authorizations made throughout the year.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight pt-6">40% of authorized accounts are using hacker contracts</h3>
                    <p>
                        Hackers quickly adopted EIP-7702. When an attacker obtains a 
                        victim&apos;s private key (through phishing, malware, etc.), they can use EIP-7702 to upgrade 
                        the already-compromised EOA with a hacker contract that automatically drains funds 
                        to the attacker&apos;s wallet.
                    </p>
                    <p>
                        Note: EIP-7702 itself was not used to hack these wallets - the private keys were already 
                        compromised before 7702 was used. Hackers simply adopted 7702 as a more efficient way to 
                        sweep funds from wallets they had already gained access to.
                    </p>
                    <p>
                        Hacker contracts like &quot;CrimeEnjoyor&quot; and its variants account for 2.65 million of the 6.6 
                        million total authorized wallets (40%). The remaining 4 million wallets (60%) use 
                        legitimate authorized contracts.
                    </p>

                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Hacker vs Non-Hacker Authorized Wallets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimplePieChart data={hacker_vs_nonhacker} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top Authorized Contracts</h3>
                    <p>Here are the top authorized contracts ranked by live smart accounts:</p>
                    <DataTable columns={authcontractcolumns} data={top_auth_contracts_all} entity={false} />

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top Non-Hacker Authorized Contracts</h3>
                    <p>
                        Excluding hacker contracts, the leading authorized contracts are from major wallet providers.{" "}
                        <a href="https://www.bitget.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Bitget</a>{" "}
                        leads with over 605k accounts, followed closely by{" "}
                        <a href="https://metamask.io/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Metamask</a> and{" "}
                        <a href="https://www.ambire.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Ambire</a>.
                    </p>
                    <DataTable columns={authcontractcolumns} data={top_auth_contracts_noncrime} entity={false} />
                </div>

                {/* Section 2: User Activity */}
                <div id="section2" className="flex flex-row gap-2 items-center pt-7">
                    <Users />
                    <h2 className="text-3xl font-bold tracking-tight">User Activity</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">1.2M non-hacker accounts were active in December 2025</h3>
                    <p>
                        Focusing on legitimate usage, the number of monthly active non-hacker EIP-7702 accounts 
                        grew steadily throughout 2025, from 223k in June to a peak of 1.2 million in December.
                    </p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly Active Non-Hacker Accounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimpleLineChart data={monthly_active_noncrime} xaxis="DATE" yaxis="ACTIVE_ACCOUNTS" usd={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">BSC leads in non-hacker EIP-7702 activity</h3>
                    <p>
                        BSC emerged as the dominant chain for legitimate EIP-7702 activity, with 480k 
                        active non-hacker accounts in December 2025. Base was second with 354k, followed 
                        by Ethereum mainnet with 194k.
                    </p>
                    <p>
                        BSC&apos;s dominance was driven primarily by{" "}
                        <a href="https://metamask.io/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Metamask Delegator</a> (30M total actions),{" "}
                        <a href="https://www.tokenpocket.pro/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">TokenPocket</a> (11M actions), and{" "}
                        <a href="https://www.bitget.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Bitget</a> (9M actions).
                    </p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Non-Hacker Active Accounts by Chain</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UnifiedBarChart 
                                data={noncrime_by_chain} 
                                xaxis="DATE" 
                                yaxis="ACTIVE_ACCOUNTS" 
                                segment="CHAIN"
                                barConfig={chainBarConfig}
                            />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">EOA transactions were the most common action type</h3>
                    <p>
                        EIP-7702 accounts can perform actions in four ways: regular EOA transactions, 
                        self-initiated smart account transactions, relayed actions (initiated by a third party), 
                        and ERC-4337 UserOperations.
                    </p>
                    <p>
                        Among non-hacker accounts in 2025, regular EOA transactions dominated, followed by relayed actions 
                        and self-initiated transactions. ERC-4337 UserOps were a small but growing portion of the activity.
                    </p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Non-Hacker Smart Account Actions by Type</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UnifiedBarChart 
                                data={actions_by_type} 
                                xaxis="DATE" 
                                yaxis="NUM_ACTIONS" 
                                segment="TYPE"
                                barConfig={actionTypeBarConfig}
                                isPercentage = {true}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Section 3: 7702 x 4337 */}
                <div id="section3" className="flex flex-row gap-2 items-center pt-7">
                    <Zap />
                    <h2 className="text-3xl font-bold tracking-tight">7702 x 4337</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold tracking-tight pt-6">EIP-7702 and ERC-4337 are complementary</h3>
                    <p>
                        EIP-7702 accounts can also make ERC-4337 UserOperations, combining the benefits of 
                        both protocols. This allows EOAs to access the ERC-4337 infrastructure (bundlers, 
                        paymasters) without having to migrate their assets to a new address.
                    </p>
                    <p>
                        By December 2025, EIP-7702 accounts were making 926k UserOps per month, up from just 
                        5.7k in July.
                    </p>

                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly UserOps by EIP-7702 accounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimpleLineChart data={monthly_7702_userops} xaxis="DATE" yaxis="USEROPS" usd={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Coinbase Wallet leads 7702 x 4337 adoption</h3>
                    <p>
                        <a href="https://www.coinbase.com/wallet" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Coinbase Wallet</a>{" "}
                        was the dominant authorized contract for EIP-7702 accounts making ERC-4337 UserOps, 
                        with over 211k accounts in 2025.{" "}
                        <a href="https://zerodev.app/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Zerodev</a>{" "}
                        and{" "}
                        <a href="https://www.biconomy.io/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Biconomy</a>{" "}
                        followed with 10.6k and 1.5k accounts respectively.
                    </p>

                    <DataTable columns={authcontractcolumns} data={top_7702_4337_contracts} entity={false} />

                    <h3 className="text-xl font-bold tracking-tight pt-6">225k+ accounts used 7702 for 4337 UserOps</h3>
                    <p>
                        By the end of 2025, over 225k unique EIP-7702 accounts had made at least one ERC-4337 UserOp. 
                        This represents a growing trend of users combining these two account abstraction technologies.
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
const chainBarConfig = [
    { dataKey: "bsc", fill: "#F0B90B" },
    { dataKey: "base", fill: "#0052FF" },
    { dataKey: "ethereum", fill: "#627EEA" },
    { dataKey: "polygon", fill: "#8247E5" },
    { dataKey: "arbitrum", fill: "#28A0F0" },
    { dataKey: "optimism", fill: "#FF0420" },
    { dataKey: "unichain", fill: "#FF007A" },
    { dataKey: "gnosis", fill: "#04795B" },
];

const actionTypeBarConfig = [
    { dataKey: "eoa txn", fill: "#3B82F6" },
    { dataKey: "relayed action", fill: "#8B5CF6" },
    { dataKey: "self-initated txn", fill: "#22C55E" },
    { dataKey: "erc-4337 userop", fill: "#F59E0B" },
];

// Data
const hacker_vs_nonhacker = [
    { name: "Hacker", value: 2650916, fill: "#EF4444" },
    { name: "Non-Hacker", value: 3977905, fill: "#22C55E" },
];

const top_auth_contracts_all = [
    { AUTHORIZED_CONTRACT: "Crime", NUM_WALLETS: 2650916 },
    { AUTHORIZED_CONTRACT: "Bitget", NUM_WALLETS: 605189 },
    { AUTHORIZED_CONTRACT: "Metamask Delegator", NUM_WALLETS: 514114 },
    { AUTHORIZED_CONTRACT: "Ambire Account", NUM_WALLETS: 507156 },
    { AUTHORIZED_CONTRACT: "Trustwallet", NUM_WALLETS: 234160 },
    { AUTHORIZED_CONTRACT: "TokenPocket", NUM_WALLETS: 221667 },
    { AUTHORIZED_CONTRACT: "0x8d18...1e", NUM_WALLETS: 217921 },
    { AUTHORIZED_CONTRACT: "Coinbase Wallet", NUM_WALLETS: 200248 },
    { AUTHORIZED_CONTRACT: "WhiteBit Account", NUM_WALLETS: 142755 },
    { AUTHORIZED_CONTRACT: "Simple 7702Account", NUM_WALLETS: 137745 },
    { AUTHORIZED_CONTRACT: "Uniswap", NUM_WALLETS: 117035 },
];

const top_auth_contracts_noncrime = [
    { AUTHORIZED_CONTRACT: "Bitget", NUM_WALLETS: 605189 },
    { AUTHORIZED_CONTRACT: "Metamask Delegator", NUM_WALLETS: 514114 },
    { AUTHORIZED_CONTRACT: "Ambire Account", NUM_WALLETS: 507156 },
    { AUTHORIZED_CONTRACT: "Trustwallet", NUM_WALLETS: 234160 },
    { AUTHORIZED_CONTRACT: "TokenPocket", NUM_WALLETS: 221667 },
    { AUTHORIZED_CONTRACT: "0x8d18...1e", NUM_WALLETS: 217921 },
    { AUTHORIZED_CONTRACT: "Coinbase Wallet", NUM_WALLETS: 200248 },
    { AUTHORIZED_CONTRACT: "WhiteBit Account", NUM_WALLETS: 142755 },
    { AUTHORIZED_CONTRACT: "Simple 7702Account", NUM_WALLETS: 137745 },
    { AUTHORIZED_CONTRACT: "Uniswap", NUM_WALLETS: 117035 },
    { AUTHORIZED_CONTRACT: "0xd057...3e", NUM_WALLETS: 116605 },
    { AUTHORIZED_CONTRACT: "Zerodev", NUM_WALLETS: 77674 },
];

const monthly_active_noncrime = [
    { DATE: "2025-06-01", ACTIVE_ACCOUNTS: 223224 },
    { DATE: "2025-07-01", ACTIVE_ACCOUNTS: 343691 },
    { DATE: "2025-08-01", ACTIVE_ACCOUNTS: 466032 },
    { DATE: "2025-09-01", ACTIVE_ACCOUNTS: 607187 },
    { DATE: "2025-10-01", ACTIVE_ACCOUNTS: 790196 },
    { DATE: "2025-11-01", ACTIVE_ACCOUNTS: 930650 },
    { DATE: "2025-12-01", ACTIVE_ACCOUNTS: 1208711 },
];

const noncrime_by_chain = [
    { DATE: "2025-06-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 90933 },
    { DATE: "2025-06-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 76804 },
    { DATE: "2025-06-01", CHAIN: "base", ACTIVE_ACCOUNTS: 49355 },
    { DATE: "2025-06-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 29402 },
    { DATE: "2025-06-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 13311 },
    { DATE: "2025-06-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 2740 },
    { DATE: "2025-06-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 597 },
    { DATE: "2025-07-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 137802 },
    { DATE: "2025-07-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 84396 },
    { DATE: "2025-07-01", CHAIN: "base", ACTIVE_ACCOUNTS: 69017 },
    { DATE: "2025-07-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 52969 },
    { DATE: "2025-07-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 28868 },
    { DATE: "2025-07-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 15852 },
    { DATE: "2025-07-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 5601 },
    { DATE: "2025-07-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 898 },
    { DATE: "2025-08-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 170721 },
    { DATE: "2025-08-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 152561 },
    { DATE: "2025-08-01", CHAIN: "base", ACTIVE_ACCOUNTS: 116484 },
    { DATE: "2025-08-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 55941 },
    { DATE: "2025-08-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 45492 },
    { DATE: "2025-08-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 39328 },
    { DATE: "2025-08-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 5598 },
    { DATE: "2025-08-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 2552 },
    { DATE: "2025-09-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 251593 },
    { DATE: "2025-09-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 175539 },
    { DATE: "2025-09-01", CHAIN: "base", ACTIVE_ACCOUNTS: 149173 },
    { DATE: "2025-09-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 59844 },
    { DATE: "2025-09-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 53803 },
    { DATE: "2025-09-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 33815 },
    { DATE: "2025-09-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 6526 },
    { DATE: "2025-09-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 5576 },
    { DATE: "2025-10-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 349712 },
    { DATE: "2025-10-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 195834 },
    { DATE: "2025-10-01", CHAIN: "base", ACTIVE_ACCOUNTS: 174019 },
    { DATE: "2025-10-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 91625 },
    { DATE: "2025-10-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 88835 },
    { DATE: "2025-10-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 16710 },
    { DATE: "2025-10-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 4949 },
    { DATE: "2025-10-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 1222 },
    { DATE: "2025-11-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 457067 },
    { DATE: "2025-11-01", CHAIN: "base", ACTIVE_ACCOUNTS: 209288 },
    { DATE: "2025-11-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 168813 },
    { DATE: "2025-11-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 105442 },
    { DATE: "2025-11-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 83604 },
    { DATE: "2025-11-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 13453 },
    { DATE: "2025-11-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 4163 },
    { DATE: "2025-11-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 2012 },
    { DATE: "2025-12-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 480207 },
    { DATE: "2025-12-01", CHAIN: "base", ACTIVE_ACCOUNTS: 353644 },
    { DATE: "2025-12-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 193821 },
    { DATE: "2025-12-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 151024 },
    { DATE: "2025-12-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 143759 },
    { DATE: "2025-12-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 12871 },
    { DATE: "2025-12-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 3559 },
    { DATE: "2025-12-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 1648 },
];

const actions_by_type = [
    { DATE: "2025-06-01", TYPE: "eoa txn", NUM_ACTIONS: 2415949 },
    { DATE: "2025-06-01", TYPE: "relayed action", NUM_ACTIONS: 466645 },
    { DATE: "2025-06-01", TYPE: "self-initated txn", NUM_ACTIONS: 713707 },
    { DATE: "2025-06-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 7943 },
    { DATE: "2025-07-01", TYPE: "eoa txn", NUM_ACTIONS: 6143753 },
    { DATE: "2025-07-01", TYPE: "relayed action", NUM_ACTIONS: 3967008 },
    { DATE: "2025-07-01", TYPE: "self-initated txn", NUM_ACTIONS: 2160222 },
    { DATE: "2025-07-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 6357 },
    { DATE: "2025-08-01", TYPE: "eoa txn", NUM_ACTIONS: 8842730 },
    { DATE: "2025-08-01", TYPE: "relayed action", NUM_ACTIONS: 8753705 },
    { DATE: "2025-08-01", TYPE: "self-initated txn", NUM_ACTIONS: 2520558 },
    { DATE: "2025-08-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 7289 },
    { DATE: "2025-09-01", TYPE: "eoa txn", NUM_ACTIONS: 13170273 },
    { DATE: "2025-09-01", TYPE: "relayed action", NUM_ACTIONS: 16023168 },
    { DATE: "2025-09-01", TYPE: "self-initated txn", NUM_ACTIONS: 4263351 },
    { DATE: "2025-09-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 15741 },
    { DATE: "2025-10-01", TYPE: "eoa txn", NUM_ACTIONS: 23356206 },
    { DATE: "2025-10-01", TYPE: "relayed action", NUM_ACTIONS: 30150332 },
    { DATE: "2025-10-01", TYPE: "self-initated txn", NUM_ACTIONS: 6631391 },
    { DATE: "2025-10-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 49150 },
    { DATE: "2025-11-01", TYPE: "eoa txn", NUM_ACTIONS: 19760739 },
    { DATE: "2025-11-01", TYPE: "relayed action", NUM_ACTIONS: 18657386 },
    { DATE: "2025-11-01", TYPE: "self-initated txn", NUM_ACTIONS: 4482364 },
    { DATE: "2025-11-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 360750 },
    { DATE: "2025-12-01", TYPE: "eoa txn", NUM_ACTIONS: 18541263 },
    { DATE: "2025-12-01", TYPE: "relayed action", NUM_ACTIONS: 15987913 },
    { DATE: "2025-12-01", TYPE: "self-initated txn", NUM_ACTIONS: 4327297 },
    { DATE: "2025-12-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 926143 },
];

const monthly_7702_userops = [
    { DATE: "2025-07-01", USEROPS: 5730 },
    { DATE: "2025-08-01", USEROPS: 7288 },
    { DATE: "2025-09-01", USEROPS: 15741 },
    { DATE: "2025-10-01", USEROPS: 49153 },
    { DATE: "2025-11-01", USEROPS: 360757 },
    { DATE: "2025-12-01", USEROPS: 926184 },
];

const top_7702_4337_contracts = [
    { AUTHORIZED_CONTRACT: "Coinbase Wallet", NUM_WALLETS: 211668 },
    { AUTHORIZED_CONTRACT: "Zerodev", NUM_WALLETS: 10629 },
    { AUTHORIZED_CONTRACT: "Biconomy", NUM_WALLETS: 1479 },
    { AUTHORIZED_CONTRACT: "0x336e...44", NUM_WALLETS: 766 },
    { AUTHORIZED_CONTRACT: "0x24be...2f", NUM_WALLETS: 161 },
    { AUTHORIZED_CONTRACT: "0x00aa...05", NUM_WALLETS: 142 },
    { AUTHORIZED_CONTRACT: "Alchemy", NUM_WALLETS: 125 },
    { AUTHORIZED_CONTRACT: "Simple 7702Account", NUM_WALLETS: 96 },
    { AUTHORIZED_CONTRACT: "Bitget", NUM_WALLETS: 71 },
    { AUTHORIZED_CONTRACT: "Ambire Account", NUM_WALLETS: 53 },
];
