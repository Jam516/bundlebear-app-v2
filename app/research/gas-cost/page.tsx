import { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SiteFooter } from "@/components/footer";

export const metadata: Metadata = {
    title: "How much does it cost to use a smart account? | BundleBear Research",
    description: "An analysis of the cost of using smart accounts on L2s and sidechains.",
};

export default function GasCostPage() {
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-6 p-8 pt-6 md:w-3/5 md:mx-auto prose prose-slate dark:prose-invert max-w-none">
                <div className="not-prose">
                    <Link href="/research" className="text-blue-500 hover:underline text-sm">
                        ← Back to Research
                    </Link>
                </div>

                <div className="flex flex-col space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">How much does it cost to use a smart account?</h1>
                    <p className="text-muted-foreground">December 7, 2023</p>
                </div>

                <Separator />

                <p><strong>Sponsored by Safe</strong> 🟢✨</p>

                <p>
                    Ethereum has a native account system in which each account, known as an EOA, is controlled by a single private key. 
                    Users must securely store this key and use it to sign every transaction. This approach has several drawbacks. 
                    Firstly, users are vulnerable to losing their funds if they misplace or have their keys stolen. 
                    Secondly, it is difficult to automate and customize transaction execution without giving up control of the keys or the assets in the account.
                </p>

                <p>
                    Smart accounts address these problems by implementing a system where every account is controlled by a smart contract. 
                    Smart contracts are highly customizable, allowing smart accounts to incorporate various verification and transaction execution logic 
                    that would not be feasible with an EOA. Since 2018, Safe has been at the forefront of the smart account movement, offering an 
                    implementation with features such as multisignature signing, transaction batching and gas sponsorship. This year, a new standard 
                    called ERC4337 was launched to establish a common framework for smart accounts.
                </p>

                <p>
                    If smart accounts allow for more security and an enhanced user experience, why haven&apos;t smart accounts surpassed EOAs in adoption? 
                    One major factor has been the cost of creating and using them on Layer 1 (L1). During the peak of the 2021 bull run, it could cost 
                    hundreds of dollars to deploy a smart account on L1. This issue killed many early smart account teams, as they struggled to find 
                    users willing to pay the steep account creation costs and couldn&apos;t afford to pay the costs themselves. However, with the 
                    introduction of Layer 2s (L2s) and sidechains, the cost of deploying and using smart accounts in the Ethereum ecosystem has become 
                    more affordable.
                </p>

                <p>
                    In this article, we will analyze the cost of using smart accounts on these L2s and sidechains. Specifically, we will focus on 
                    Safe accounts and ERC4337 implementations such as{" "}
                    <a href="https://zerodev.app/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Zerodev Kernel</a> and the{" "}
                    <a href="https://www.biconomy.io/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Biconomy Account</a>. 
                    We will start by analyzing the cost of native token transfers (ETH transfer on Ethereum, Arbitrum, Optimism and MATIC transfers on Polygon). 
                    Then, we will break down the cost of performing ERC20 transfers and deploying new accounts. Finally, we discuss the future outlook of 
                    smart account economics.
                </p>

                <h2 className="text-3xl font-bold mt-8">Native Transfers</h2>

                <p>
                    Using historical data, let&apos;s examine the cost of performing a native token transfer using a smart account. For ERC4337 accounts, 
                    we will analyze the <code>actualGasCost</code> of UserOps that execute a native token transfer. For Safe accounts, we will consider the 
                    transaction fee for Safe transactions that achieve the same transfer.
                </p>

                <p>
                    This analysis does not aim to compare the gas efficiency of different account implementations. Several factors, such as fluctuating gas prices, 
                    the gas premium charged by the bundler of the UserOp and the fee settings chosen by the app/wallet, influence the cost of an operation, 
                    apart from gas efficiency. Instead, this analysis aims to measure the costs that users are facing in real life.
                </p>

                <p>
                    We have excluded{" "}
                    <a href="https://optimistic.etherscan.io/tx/0x9c6d6690b0f16757ec2110d5e7677a92cc885e0d1dc2573d99abaae0936131f3" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        anomalous UserOps
                    </a>{" "}
                    where the bundler accepted UserOps with fees significantly lower than the required amount to cover the bundle transaction cost and{" "}
                    <a href="https://polygonscan.com/tx/0x89dfa0aaeaa646b934b64142e6578a55107051f4c2d15dd188b81869e544e068" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        anomalous transactions
                    </a>{" "}
                    where gas prices greatly exceeded the norm.
                </p>

                <h3 className="text-2xl font-bold mt-6">Polygon</h3>

                <img src="https://i.imgur.com/tInxT8b.png" alt="Polygon native transfers chart" className="w-full rounded-lg" />

                <p>
                    On Polygon, Safe users are currently spending the least on native transfers with a weekly average cost of $0.01, followed by Zerodev users 
                    at $0.025 and Biconomy users at $0.038. The small difference of $0.028 between the highest and lowest cost indicates that the chosen account 
                    implementation does not significantly impact the user experience on low-cost networks.
                </p>

                <p>
                    This is particularly true because the current costs exhibit an unusually wide range of variation. In 87% of weeks, the difference between 
                    the highest and lowest cost is less than $0.015.
                </p>

                <h3 className="text-2xl font-bold mt-6">Optimism</h3>

                <img src="https://i.imgur.com/KehLihw.png" alt="Optimism native transfers chart" className="w-full rounded-lg" />

                <p>
                    On Optimism, it has been more expensive for smart accounts to make native transfers than on Polygon. Biconomy account users have a weekly 
                    average cost of $0.77 per native transfer, while Zerodev Kernel users spend $0.79 and Safe users spend $0.30.
                </p>

                <h3 className="text-2xl font-bold mt-6">Arbitrum</h3>

                <img src="https://i.imgur.com/jVesq0d.png" alt="Arbitrum native transfers chart" className="w-full rounded-lg" />

                <p>
                    ERC4337 accounts have made fewer native transfers on Arbitrum compared to Polygon and Optimism, so we only have enough data to measure 
                    spending in the past three months.
                </p>

                <p>
                    Arbitrum has been more expensive for native transfers than both Polygon and Optimism. The cost of native transfers currently sits at $0.46 
                    for Safes, $0.76 for Zerodev Kernels, and $1.05 for Biconomy accounts.
                </p>

                <h3 className="text-2xl font-bold mt-6">Insight</h3>

                <p>
                    Here we observe that selecting the most expensive network in the dataset (Arbitrum) instead of the cheapest one (Polygon) increases the 
                    average cost of making a native transfer by more than 30X. The impact of choosing one account implementation over another is negligible 
                    compared to the choice of network.
                </p>

                <p>
                    That said, Safe account users consistently spent less on native transfers than ERC4337 account users.
                </p>

                <p>
                    It is also evident that UserOp fees and Safe transaction prices rose sharply in November. This can be attributed to a general increase 
                    in on-chain activity, caused by the recent surge in{" "}
                    <a href="https://dune.com/hildobby/inscriptions" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">inscriptions</a>, 
                    which is leading to higher gas fees.
                </p>

                <img src="https://i.imgur.com/evjabcY.png" alt="Transaction activity chart" className="w-full rounded-lg" />

                <h2 className="text-3xl font-bold mt-8">ERC20 Transfers</h2>

                <p>
                    Next, we will analyze the cost of making ERC20 transfers using different smart accounts. It&apos;s important to note again that this is 
                    not a direct comparison of efficiency. The validation process for ERC4337 UserOps is completely different from Safe transaction validation. 
                    Additionally, the Safe transactions in this dataset are not bundled, whereas UserOps are.
                </p>

                <h3 className="text-2xl font-bold mt-6">Polygon</h3>

                <img src="https://i.imgur.com/8pezGcf.png" alt="Polygon ERC20 transfers chart" className="w-full rounded-lg" />

                <p>
                    The weekly average cost of making an ERC20 transfer on Polygon is currently $0.011 for Safe account users, $0.017 for Zerodev Kernel users 
                    and $0.021 for Biconomy account users.
                </p>

                <p>
                    The difference between the highest and lowest costs is only $0.01. Once again, we&apos;re observing that on low-cost chains, there is 
                    minimal variation in cost between different account implementations.
                </p>

                <h3 className="text-2xl font-bold mt-6">Optimism</h3>

                <img src="https://i.imgur.com/DZPvQcG.png" alt="Optimism ERC20 transfers chart" className="w-full rounded-lg" />

                <p>
                    On Optimism, ERC20 transfers currently cost an average of $0.59 for Safe accounts, $0.96 for Biconomy accounts and $0.99 for Zerodev Kernels.
                </p>

                <p>
                    As a reminder, we are excluding anomalous transactions like{" "}
                    <a href="https://optimistic.etherscan.io/tx/0x5cbdcf4e7ff1eb9d7db2a20640f2cbbb51dd54cadaa7ca136c10816fec6bb9ae" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        0x5c…b9ae
                    </a>{" "}
                    where the fees paid by the ERC4337 UserOps greatly exceed what is needed to cover their fair share of transaction costs. This can occur 
                    when the wallet or application being used has mistakenly high fee settings.
                </p>

                <h3 className="text-2xl font-bold mt-6">Arbitrum</h3>

                <img src="https://i.imgur.com/K7cNZV8.png" alt="Arbitrum ERC20 transfers chart" className="w-full rounded-lg" />

                <p>
                    On Arbitrum, the weekly average cost of making an ERC20 transfer is currently $0.66 for Safe accounts, $1.14 for Biconomy accounts and 
                    $1.17 for Zerodev Kernels.
                </p>

                <h3 className="text-2xl font-bold mt-6">Insight</h3>

                <p>
                    Once again, the selection of a smart account implementation has had a relatively minor impact on user experience compared to the choice 
                    of network. On Polygon, the costs of ERC20 transfers on different smart accounts vary within a narrow range of $0.01. However, on Arbitrum, 
                    this range is larger, at $0.51. The differences between account implementations seem to be less pronounced on low-cost chains.
                </p>

                <h2 className="text-3xl font-bold mt-8">Account Deployment</h2>

                <p>
                    Finally, let&apos;s take a look at the average dollar cost of deploying smart accounts. We will study the gas fees of transactions where 
                    a Safe or an ERC4337 account was created. It&apos;s important to note that this is not a pure analysis of the cost of creating a single 
                    account. Multiple smart accounts can be created in the same transaction and, unlike Safe deployments, ERC4337 account deployments do not 
                    usually happen in isolation but rather get bundled with the first operation made by that account.
                </p>

                <h3 className="text-2xl font-bold mt-6">Polygon</h3>

                <img src="https://i.imgur.com/0xJsHRC.png" alt="Polygon account deployment chart" className="w-full rounded-lg" />

                <p>
                    Safe deployment transactions on Polygon currently cost an average of $0.036. On average, transactions involving a Zerodev Kernel deployment 
                    cost $0.048, while transactions involving a Biconomy account deployment cost $0.024.
                </p>

                <h3 className="text-2xl font-bold mt-6">Optimism</h3>

                <img src="https://i.imgur.com/UaBAHjg.png" alt="Optimism account deployment chart" className="w-full rounded-lg" />

                <p>
                    Safe deployment transactions on Optimism have an average weekly cost of $0.0481. On average, transactions involving a Zerodev Kernel 
                    deployment cost $0.663, while transactions involving a Biconomy account deployment cost $1.10.
                </p>

                <h3 className="text-2xl font-bold mt-6">Arbitrum</h3>

                <img src="https://i.imgur.com/t7RHqNh.png" alt="Arbitrum account deployment chart" className="w-full rounded-lg" />

                <p>
                    Safe deployment transactions on Arbitrum have an average weekly cost of $0.44. On average, transactions involving a Zerodev Kernel deployment 
                    cost $0.98, while transactions involving a Biconomy account deployment cost $1.12.
                </p>

                <h2 className="text-3xl font-bold mt-8">Future Outlook</h2>

                <p>
                    Smart accounts make it possible to deliver better onchain user experiences and it&apos;s important that they are affordable for users. 
                    L2s and sidechains have significantly reduced the cost of using smart accounts. The data indicates that the choice of chain has a greater 
                    impact on smart account costs than the choice of account implementation. While gas-based comparisons may indicate big differences between 
                    providers, the actual cost differences for users in terms of dollars are minimal if they opt for a low-cost chain/L2.
                </p>

                <p>
                    It&apos;s still early days and there is work to be done. Here are some specific areas where progress can be made in reducing the cost of 
                    using ERC4337 accounts:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        A significant portion of ERC4337 smart account activity takes place on L2s.{" "}
                        <a href="https://www.eip4844.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">EIP-4844</a> is an 
                        upcoming Ethereum upgrade that will introduce a new type of transaction called a blob. Rollups will utilize blobs to post data to L1. 
                        Unlike normal transactions, which are permanently stored on Ethereum, blobs will only be stored for 2 weeks, so they will be priced 
                        a lot cheaper. This change should greatly reduce the cost of using Ethereum rollups and smart accounts on those rollups.
                    </li>
                    <li>
                        Signature Aggregators can reduce the cost of ERC4337 UserOps by reducing the amount of calldata that is required. Currently, existing 
                        ERC4337 wallet apps do not utilize them, but once they become more widely adopted, this will have a significant impact on costs.
                    </li>
                </ul>

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

