export function AboutBlock() {
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