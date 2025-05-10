export function AboutBlock() {
    return (
        <div className="grid gap-6 text-sm grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-left">
                <h2 className="font-bold ">What is an EIP-7702 smart account?</h2>
                <p>A smart contract wallet AKA smart account is a customizable Ethereum account. Smart accounts can be programmed with features like</p>
                <p>* Batched transactions: Multiple actions, such as approving and swapping on a DEX, can be combined into one transaction.</p>
                <p>* Gas fee abstraction: Users can transact without having to pay gas fees in the native token.</p>

            </div>
            <div className="flex flex-col items-left">
                <h2 className="font-bold ">What is an EIP-7702 Authorization?</h2>
                <p>Regular EOA wallets upgrade to EIP-7702 smart accounts by authorizing a contract. The upgraded wallet has a &quot;delegation indicator&quot; that points to the authorized contract. When a transaction is sent to the EOA, it executes the code of the authorized contract.</p>
                <p>To downgrade back to a regular EOA, the wallet authorizes the burn address.</p>
                <p>- </p>
                <h2 className="font-bold ">What is a Set Code transaction?</h2>
                <p>A transaction where Authorizations are executed onchain, thereby upgrading EOAs to smart accounts. One set code txn can contain multiple Authorizations.</p>
            </div>
        </div>
    )
}