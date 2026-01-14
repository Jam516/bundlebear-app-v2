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
import { authcontractcolumns, overlap4337columns, transactingcontractcolumns } from "@/components/columns";

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
                    <h3 className="text-xl font-bold tracking-tight pt-6">1.5M non-hacker accounts were active in December 2025</h3>
                    <p>
                        Focusing on legitimate usage, the number of monthly transacting non-hacker EIP-7702 accounts 
                        grew steadily throughout 2025, from 240k in June to a peak of 1.5 million in December.
                    </p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly Transacting Non-Hacker Accounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimpleLineChart data={monthly_active_noncrime} xaxis="DATE" yaxis="ACTIVE_ACCOUNTS" usd={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">BSC leads in non-hacker EIP-7702 activity</h3>
                    <p>
                        BSC emerged as the dominant chain for legitimate EIP-7702 activity, with 598k 
                        transacting non-hacker accounts in December 2025. Base was second with 393k, followed 
                        by Ethereum mainnet with 222k, and Polygon with 219k.
                    </p>
                    <p>
                        BSC&apos;s dominance was driven primarily by{" "}
                        <a href="https://metamask.io/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Metamask Delegator</a> (30M total actions),{" "}
                        <a href="https://www.tokenpocket.pro/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">TokenPocket</a> (11M actions), and{" "}
                        <a href="https://www.bitget.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Bitget</a> (9M actions).
                    </p>
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Non-Hacker Transacting Accounts by Chain</CardTitle>
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

                    <h3 className="text-xl font-bold tracking-tight pt-6">Top Authorized Contracts by Active Wallets</h3>
                    <p>
                        Looking at which authorized contracts had the most 5+ time transacting wallets in 2025,{" "}
                        <a href="https://www.bitget.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Bitget</a>{" "}
                        leads with 420k wallets, followed by{" "}
                        <a href="https://metamask.io/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Metamask Delegator</a>{" "}
                        with 358k and{" "}
                        <a href="https://www.tokenpocket.pro/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">TokenPocket</a>{" "}
                        with 137k.
                    </p>
                    <DataTable columns={transactingcontractcolumns} data={top_transacting_contracts} entity={false} />
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
                        By December 2025, EIP-7702 accounts were making 2.3 million UserOps per month, up from 
                        109k in July - a 20x increase over the second half of the year.
                    </p>

                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="mx-auto">Monthly UserOps by EIP-7702 accounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SimpleLineChart data={monthly_7702_userops} xaxis="DATE" yaxis="USEROPS" usd={false} />
                        </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold tracking-tight pt-6">Trustwallet leads 7702 x 4337 adoption</h3>
                    <p>
                        <a href="https://trustwallet.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Trustwallet</a>{" "}
                        was the dominant authorized contract for EIP-7702 accounts making ERC-4337 UserOps, 
                        with 233k accounts in 2025.{" "}
                        <a href="https://www.coinbase.com/wallet" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Coinbase Wallet</a>{" "}
                        followed with 191k accounts, then{" "}
                        <a href="https://zerodev.app/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Zerodev</a>{" "}
                        with 77k and{" "}
                        <a href="https://alchemy.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Alchemy</a>{" "}
                        with 75k.
                    </p>

                    <DataTable columns={overlap4337columns} data={top_7702_4337_contracts} entity={false} />

                    <h3 className="text-xl font-bold tracking-tight pt-6">805k accounts used 7702 for 4337 UserOps</h3>
                    <p>
                        By the end of 2025, over 805k unique EIP-7702 accounts had made at least one ERC-4337 UserOp. 
                        This represents a significant trend of wallet apps combining these two account abstraction technologies.
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
    { DATE: "2025-06-01", ACTIVE_ACCOUNTS: 239944 },
    { DATE: "2025-07-01", ACTIVE_ACCOUNTS: 367556 },
    { DATE: "2025-08-01", ACTIVE_ACCOUNTS: 489066 },
    { DATE: "2025-09-01", ACTIVE_ACCOUNTS: 650654 },
    { DATE: "2025-10-01", ACTIVE_ACCOUNTS: 859509 },
    { DATE: "2025-11-01", ACTIVE_ACCOUNTS: 1072819 },
    { DATE: "2025-12-01", ACTIVE_ACCOUNTS: 1473900 },
];
/*
Query:
SELECT
    DATE_TRUNC('month', BLOCK_DATE) AS DATE,
    COUNT(DISTINCT FROM_ADDRESS) AS ACTIVE_ACCOUNTS
FROM BUNDLEBEAR.DBT_KOFI.EIP7702_ACTIONS a
LEFT JOIN BUNDLEBEAR.DBT_KOFI.EIP7702_LABELS_AUTHORIZED_CONTRACTS l
    ON a.AUTHORIZED_CONTRACT = l.ADDRESS
WHERE BLOCK_DATE >= DATE('2025-01-01')
  AND BLOCK_DATE < DATE('2026-01-01')
  AND COALESCE(l.NAME, '') NOT LIKE '%Crime%'
GROUP BY 1
ORDER BY 1
*/

const noncrime_by_chain = [
    { DATE: "2025-06-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 98984 },
    { DATE: "2025-06-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 84724 },
    { DATE: "2025-06-01", CHAIN: "base", ACTIVE_ACCOUNTS: 50222 },
    { DATE: "2025-06-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 29708 },
    { DATE: "2025-06-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 13334 },
    { DATE: "2025-06-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 2740 },
    { DATE: "2025-06-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 602 },
    { DATE: "2025-07-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 153061 },
    { DATE: "2025-07-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 88682 },
    { DATE: "2025-07-01", CHAIN: "base", ACTIVE_ACCOUNTS: 72484 },
    { DATE: "2025-07-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 53604 },
    { DATE: "2025-07-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 31294 },
    { DATE: "2025-07-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 17047 },
    { DATE: "2025-07-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 5772 },
    { DATE: "2025-07-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 963 },
    { DATE: "2025-08-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 185828 },
    { DATE: "2025-08-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 154732 },
    { DATE: "2025-08-01", CHAIN: "base", ACTIVE_ACCOUNTS: 120034 },
    { DATE: "2025-08-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 58004 },
    { DATE: "2025-08-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 46883 },
    { DATE: "2025-08-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 39586 },
    { DATE: "2025-08-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 5598 },
    { DATE: "2025-08-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 2561 },
    { DATE: "2025-09-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 256910 },
    { DATE: "2025-09-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 193479 },
    { DATE: "2025-09-01", CHAIN: "base", ACTIVE_ACCOUNTS: 164074 },
    { DATE: "2025-09-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 66192 },
    { DATE: "2025-09-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 56960 },
    { DATE: "2025-09-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 36963 },
    { DATE: "2025-09-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 6521 },
    { DATE: "2025-09-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 5574 },
    { DATE: "2025-10-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 365214 },
    { DATE: "2025-10-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 220283 },
    { DATE: "2025-10-01", CHAIN: "base", ACTIVE_ACCOUNTS: 201449 },
    { DATE: "2025-10-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 103202 },
    { DATE: "2025-10-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 98302 },
    { DATE: "2025-10-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 24126 },
    { DATE: "2025-10-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 4949 },
    { DATE: "2025-10-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 1251 },
    { DATE: "2025-11-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 514027 },
    { DATE: "2025-11-01", CHAIN: "base", ACTIVE_ACCOUNTS: 237626 },
    { DATE: "2025-11-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 197389 },
    { DATE: "2025-11-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 133660 },
    { DATE: "2025-11-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 96638 },
    { DATE: "2025-11-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 22144 },
    { DATE: "2025-11-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 4163 },
    { DATE: "2025-11-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 2074 },
    { DATE: "2025-12-01", CHAIN: "bsc", ACTIVE_ACCOUNTS: 598497 },
    { DATE: "2025-12-01", CHAIN: "base", ACTIVE_ACCOUNTS: 393368 },
    { DATE: "2025-12-01", CHAIN: "ethereum", ACTIVE_ACCOUNTS: 222073 },
    { DATE: "2025-12-01", CHAIN: "polygon", ACTIVE_ACCOUNTS: 219469 },
    { DATE: "2025-12-01", CHAIN: "arbitrum", ACTIVE_ACCOUNTS: 165246 },
    { DATE: "2025-12-01", CHAIN: "optimism", ACTIVE_ACCOUNTS: 22327 },
    { DATE: "2025-12-01", CHAIN: "unichain", ACTIVE_ACCOUNTS: 3559 },
    { DATE: "2025-12-01", CHAIN: "gnosis", ACTIVE_ACCOUNTS: 1770 },
];
/*
Query:
SELECT
    DATE_TRUNC('month', BLOCK_DATE) AS DATE,
    CHAIN,
    COUNT(DISTINCT FROM_ADDRESS) AS ACTIVE_ACCOUNTS
FROM BUNDLEBEAR.DBT_KOFI.EIP7702_ACTIONS a
LEFT JOIN BUNDLEBEAR.DBT_KOFI.EIP7702_LABELS_AUTHORIZED_CONTRACTS l
    ON a.AUTHORIZED_CONTRACT = l.ADDRESS
WHERE BLOCK_DATE >= DATE('2025-06-01')
  AND BLOCK_DATE < DATE('2026-01-01')
  AND COALESCE(l.NAME, '') NOT LIKE '%Crime%'
GROUP BY 1, 2
ORDER BY 1, 3 DESC
*/

const actions_by_type = [
    { DATE: "2025-06-01", TYPE: "eoa txn", NUM_ACTIONS: 2415949 },
    { DATE: "2025-06-01", TYPE: "self-initated txn", NUM_ACTIONS: 713707 },
    { DATE: "2025-06-01", TYPE: "relayed action", NUM_ACTIONS: 466645 },
    { DATE: "2025-06-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 120978 },
    { DATE: "2025-07-01", TYPE: "eoa txn", NUM_ACTIONS: 6143753 },
    { DATE: "2025-07-01", TYPE: "relayed action", NUM_ACTIONS: 3967008 },
    { DATE: "2025-07-01", TYPE: "self-initated txn", NUM_ACTIONS: 2160222 },
    { DATE: "2025-07-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 109362 },
    { DATE: "2025-08-01", TYPE: "eoa txn", NUM_ACTIONS: 8842730 },
    { DATE: "2025-08-01", TYPE: "relayed action", NUM_ACTIONS: 8753705 },
    { DATE: "2025-08-01", TYPE: "self-initated txn", NUM_ACTIONS: 2520558 },
    { DATE: "2025-08-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 213952 },
    { DATE: "2025-09-01", TYPE: "relayed action", NUM_ACTIONS: 16023168 },
    { DATE: "2025-09-01", TYPE: "eoa txn", NUM_ACTIONS: 13170273 },
    { DATE: "2025-09-01", TYPE: "self-initated txn", NUM_ACTIONS: 4263351 },
    { DATE: "2025-09-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 408458 },
    { DATE: "2025-10-01", TYPE: "relayed action", NUM_ACTIONS: 30150332 },
    { DATE: "2025-10-01", TYPE: "eoa txn", NUM_ACTIONS: 23356206 },
    { DATE: "2025-10-01", TYPE: "self-initated txn", NUM_ACTIONS: 6631391 },
    { DATE: "2025-10-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 784630 },
    { DATE: "2025-11-01", TYPE: "eoa txn", NUM_ACTIONS: 19760739 },
    { DATE: "2025-11-01", TYPE: "relayed action", NUM_ACTIONS: 18657386 },
    { DATE: "2025-11-01", TYPE: "self-initated txn", NUM_ACTIONS: 4482364 },
    { DATE: "2025-11-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 1165928 },
    { DATE: "2025-12-01", TYPE: "eoa txn", NUM_ACTIONS: 17907166 },
    { DATE: "2025-12-01", TYPE: "relayed action", NUM_ACTIONS: 15559121 },
    { DATE: "2025-12-01", TYPE: "self-initated txn", NUM_ACTIONS: 4179625 },
    { DATE: "2025-12-01", TYPE: "erc-4337 userop", NUM_ACTIONS: 2283597 },
];
/*
Query:
SELECT
    DATE_TRUNC('month', BLOCK_DATE) AS DATE,
    TYPE,
    COUNT(*) AS NUM_ACTIONS
FROM BUNDLEBEAR.DBT_KOFI.EIP7702_ACTIONS a
LEFT JOIN BUNDLEBEAR.DBT_KOFI.EIP7702_LABELS_AUTHORIZED_CONTRACTS l
    ON a.AUTHORIZED_CONTRACT = l.ADDRESS
WHERE BLOCK_DATE >= DATE('2025-06-01')
  AND BLOCK_DATE < DATE('2026-01-01')
  AND COALESCE(l.NAME, '') NOT LIKE '%Crime%'
GROUP BY 1, 2
ORDER BY 1, 3 DESC
*/

const top_transacting_contracts = [
    { AUTHORIZED_CONTRACT: "Bitget", NUM_WALLETS: 419978 },
    { AUTHORIZED_CONTRACT: "Metamask Delegator", NUM_WALLETS: 357552 },
    { AUTHORIZED_CONTRACT: "TokenPocket", NUM_WALLETS: 137247 },
    { AUTHORIZED_CONTRACT: "Trustwallet", NUM_WALLETS: 79361 },
    { AUTHORIZED_CONTRACT: "Uniswap", NUM_WALLETS: 70553 },
    { AUTHORIZED_CONTRACT: "0x9d36...0f", NUM_WALLETS: 61224 },
    { AUTHORIZED_CONTRACT: "Coinbase Wallet", NUM_WALLETS: 53979 },
    { AUTHORIZED_CONTRACT: "Zerodev", NUM_WALLETS: 31736 },
    { AUTHORIZED_CONTRACT: "0xbc5b...65", NUM_WALLETS: 26050 },
    { AUTHORIZED_CONTRACT: "0x28be...b4", NUM_WALLETS: 23776 },
];
/*
Query:
SELECT
    COALESCE(l.NAME, CONCAT(LEFT(a.AUTHORIZED_CONTRACT, 6), '...', RIGHT(a.AUTHORIZED_CONTRACT, 2))) AS AUTHORIZED_CONTRACT,
    COUNT(DISTINCT a.FROM_ADDRESS) AS NUM_WALLETS
FROM BUNDLEBEAR.DBT_KOFI.EIP7702_ACTIONS a
LEFT JOIN BUNDLEBEAR.DBT_KOFI.EIP7702_LABELS_AUTHORIZED_CONTRACTS l
    ON a.AUTHORIZED_CONTRACT = l.ADDRESS
WHERE a.BLOCK_DATE >= DATE('2025-01-01')
  AND a.BLOCK_DATE < DATE('2026-01-01')
  AND COALESCE(l.NAME, '') NOT LIKE '%Crime%'
  AND a.FROM_ADDRESS IN (
      SELECT FROM_ADDRESS 
      FROM BUNDLEBEAR.DBT_KOFI.EIP7702_ACTIONS
      WHERE BLOCK_DATE >= DATE('2025-01-01')
        AND BLOCK_DATE < DATE('2026-01-01')
      GROUP BY FROM_ADDRESS
      HAVING COUNT(*) >= 5
  )
GROUP BY 1
ORDER BY 2 DESC
LIMIT 10
*/

const monthly_7702_userops = [
    { DATE: "2025-06-01", USEROPS: 121024 },
    { DATE: "2025-07-01", USEROPS: 109384 },
    { DATE: "2025-08-01", USEROPS: 213960 },
    { DATE: "2025-09-01", USEROPS: 408543 },
    { DATE: "2025-10-01", USEROPS: 784638 },
    { DATE: "2025-11-01", USEROPS: 1165985 },
    { DATE: "2025-12-01", USEROPS: 2283665 },
];
/*
Query:
SELECT
    DATE_TRUNC('month', BLOCK_DATE) AS DATE,
    COUNT(*) AS USEROPS
FROM BUNDLEBEAR.DBT_KOFI.EIP7702_ACTIONS
WHERE BLOCK_DATE >= DATE('2025-01-01')
  AND BLOCK_DATE < DATE('2026-01-01')
  AND TYPE = 'erc-4337 userop'
GROUP BY 1
ORDER BY 1
*/

const top_7702_4337_contracts = [
    { AUTHORIZED_CONTRACT: "Trustwallet", NUM_WALLETS: 233163 },
    { AUTHORIZED_CONTRACT: "Coinbase Wallet", NUM_WALLETS: 190509 },
    { AUTHORIZED_CONTRACT: "Simple 7702Account", NUM_WALLETS: 135626 },
    { AUTHORIZED_CONTRACT: "Zerodev", NUM_WALLETS: 77148 },
    { AUTHORIZED_CONTRACT: "Alchemy", NUM_WALLETS: 74499 },
    { AUTHORIZED_CONTRACT: "Biconomy", NUM_WALLETS: 53984 },
    { AUTHORIZED_CONTRACT: "TokenPocket", NUM_WALLETS: 37326 },
    { AUTHORIZED_CONTRACT: "Ambire", NUM_WALLETS: 2515 },
    { AUTHORIZED_CONTRACT: "Metamask Delegator", NUM_WALLETS: 1212 },
    { AUTHORIZED_CONTRACT: "0x336e...44", NUM_WALLETS: 763 },
];
/*
Query:
SELECT
    COALESCE(l.NAME, CONCAT(LEFT(a.AUTHORIZED_CONTRACT, 6), '...', RIGHT(a.AUTHORIZED_CONTRACT, 2))) AS AUTHORIZED_CONTRACT,
    COUNT(DISTINCT FROM_ADDRESS) AS NUM_WALLETS
FROM BUNDLEBEAR.DBT_KOFI.EIP7702_ACTIONS a
LEFT JOIN BUNDLEBEAR.DBT_KOFI.EIP7702_LABELS_AUTHORIZED_CONTRACTS l
    ON a.AUTHORIZED_CONTRACT = l.ADDRESS
WHERE TYPE = 'erc-4337 userop'
  AND BLOCK_DATE >= DATE('2025-01-01')
  AND BLOCK_DATE < DATE('2026-01-01')
GROUP BY 1
ORDER BY 2 DESC
LIMIT 10
*/
