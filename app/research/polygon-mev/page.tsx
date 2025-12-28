import { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SiteFooter } from "@/components/footer";

export const metadata: Metadata = {
    title: "ERC-4337 Bundle Frontrunning on Polygon | BundleBear Research",
    description: "Analysis of MEV bot frontrunning activity on ERC-4337 bundles on Polygon.",
};

export default function PolygonMevPage() {
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-6 p-8 pt-6 md:w-3/5 md:mx-auto prose prose-slate dark:prose-invert max-w-none">
                <div className="not-prose">
                    <Link href="/research" className="text-blue-500 hover:underline text-sm">
                        ← Back to Research
                    </Link>
                </div>

                <div className="flex flex-col space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">ERC-4337 Bundle Frontrunning on Polygon</h1>
                    <p className="text-muted-foreground">September 23, 2024</p>
                </div>

                <Separator />

                <p>
                    MEV searchers have frontrun more than 850,000 ERC-4337 bundle transactions on Polygon. I crunched the data to find out how much 
                    these bots are earning, who they&apos;re frontrunning, and how they&apos;ve affected Polygon&apos;s smart account ecosystem.
                </p>

                <h2 className="text-3xl font-bold mt-8">Context</h2>

                <p>
                    ERC-4337 wallets make pseudo-transactions called user operations (UserOps). Bundlers then batch these UserOps into transactions 
                    that go onchain. These Bundlers profit by pocketing the difference between the fees paid by the UserOps in the bundle and the 
                    gas fee of the transaction.
                </p>

                <h2 className="text-3xl font-bold mt-8">Methodology</h2>

                <p>
                    For this analysis, I used the{" "}
                    <a href="https://www.bundlebear.com/overview/all" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">BundleBear</a>{" "}
                    database. BundleBear is an open-source dashboard I built to track ERC-4337 adoption. The process for identifying potential MEV 
                    frontrunning activity is as follows:
                </p>

                <ol className="list-decimal pl-6 space-y-2">
                    <li>
                        Find all ERC-4337 bundle transactions that failed with{" "}
                        <a href="https://eips.ethereum.org/EIPS/eip-4337#error-codes" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">AA25</a>{" "}
                        (nonce error) or{" "}
                        <a href="https://eips.ethereum.org/EIPS/eip-4337#error-codes" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">AA10</a>{" "}
                        (sender already constructed) errors.
                    </li>
                    <li>Extract the hash of the failed UserOp from the validateUserOp call in the transaction.</li>
                    <li>
                        Check if a UserOp with that hash has been successfully executed in another transaction. If so, check if the bundler for the 
                        successful bundle differs from the one who failed (we&apos;re not interested in cases where bundlers frontran themselves).
                    </li>
                    <li>Exclude cases where the frontrunner is a known bundler entity, such as Pimlico, Biconomy, or Alchemy.</li>
                </ol>

                <p>
                    The main limitation of this method is that a bundler might be incorrectly labelled as an MEV bot if it belongs to a known bundler 
                    entity but hasn&apos;t been properly tagged in the{" "}
                    <a href="https://github.com/Jam516/BundleBear/blob/development/models/erc4337/labels/erc4337_labels_bundlers.sql" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        BundleBear database
                    </a>.
                </p>

                <h2 className="text-3xl font-bold mt-8">How many ERC-4337 bundles are made by MEV bots?</h2>

                <p>
                    In August, 16% of successful ERC-4337 bundles on Polygon were created by alleged MEV bots. Frontrunning activity first surged 
                    in Q2 2024, with the percentage of bundles made by frontrunners jumping from less than 1% in April to 9% in May.
                </p>

                <img 
                    src="https://oepmwadzuywhrisyygvh.supabase.co/storage/v1/object/public/Blog%20images/Screenshot%202024-09-22%20190113.png" 
                    alt="Monthly bundles by MEV bots" 
                    className="w-full rounded-lg" 
                />

                <h2 className="text-3xl font-bold mt-8">How much money are MEV bots earning from this strategy?</h2>

                <p>
                    Not much lol. MEV bots have earned a mere $4,200 in revenue from executing bundles (UserOp fees earned minus gas fees paid).
                </p>

                <img 
                    src="https://oepmwadzuywhrisyygvh.supabase.co/storage/v1/object/public/Blog%20images/Screenshot%202024-09-22%20190018.png?t=2024-09-23T07%3A31%3A36.229Z" 
                    alt="MEV bot revenue" 
                    className="w-full rounded-lg" 
                />

                <p>
                    Bundler operators (such as Alchemy, Pimlico, and Biconomy) generate most of their revenue through off-chain agreements with customers. 
                    They charge apps based on the quantity of UserOps served or take a percentage of paymaster sponsorship volume.
                </p>

                <p>
                    These operators aren&apos;t aiming to maximize their onchain revenue by demanding higher default UserOp fees from apps. This approach 
                    leaves a smaller slice of the pie for MEV bots to exploit. However, profit opportunities do arise for MEV bots when apps or users set 
                    unnecessarily high{" "}
                    <a href="https://docs.pimlico.io/permissionless/reference/pimlico-actions/getPaymasterData#maxfeepergas-optional" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                        maxFeePerGas
                    </a>{" "}
                    on their UserOps in an attempt to get faster execution.
                </p>

                <h2 className="text-3xl font-bold mt-8">Who is getting frontrun?</h2>

                <p>
                    Among known Bundler operators, Alchemy has been hit hardest by the surge in MEV bot activity, with over 420,000 bundle transactions 
                    failed due to front-running on Polygon. Pimlico follows with ~272,000 failed transactions, while Biconomy ranks third with ~34,000.
                </p>

                <img 
                    src="https://oepmwadzuywhrisyygvh.supabase.co/storage/v1/object/public/Blog%20images/Screenshot%202024-09-22%20192123.png" 
                    alt="Failed bundles by bundler" 
                    className="w-full rounded-lg" 
                />

                <p>
                    Of the UserOps executed by MEV frontrunners, 38% involved USDT transfers, 11% transferred G1 (the token of{" "}
                    <a href="https://www.grindery.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Grindery</a>{" "}
                    wallet), and 8.6% minted{" "}
                    <a href="https://app.earnm.com/en/piggybox" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Piggybox</a>{" "}
                    NFTs (rewards for{" "}
                    <a href="https://www.earnm.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Earn&apos;m</a>{" "}
                    farmers).
                </p>

                <p>
                    Frontrunning doesn&apos;t affect the users&apos; experience or negatively affect apps; they only see that their UserOp got executed. 
                    But it harms bundler operators who pay gas on failed transactions but don&apos;t earn the UserOp fees.
                </p>

                <h2 className="text-3xl font-bold mt-8">What&apos;s next?</h2>

                <p>
                    These frontrunning bots monitor the mempool—the blockchain&apos;s waiting room for pending transactions—to identify valuable 
                    transactions before execution and execute them first. Bundlers need to use solutions that hide their transactions from these 
                    searchers. On Polygon,{" "}
                    <a href="https://polygon.fastlane.xyz/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Fastlane auctions</a>{" "}
                    can be used to send bundles directly to validator nodes, preventing frontrunning.
                </p>

                <p>
                    Currently, efforts are underway to launch Polygon&apos;s first ERC-4337 mempool, exclusively serving UserOps. We&apos;ll likely 
                    witness similar competition in this mempool between MEV bots and known operators vying to serve valuable bundles first. This 
                    competition must be considered in design decisions to mitigate potential negative consequences.
                </p>

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

