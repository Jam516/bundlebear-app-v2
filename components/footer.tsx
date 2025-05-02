export function SiteFooter() {
    return (
        <footer className="border-t border-gray-300">
            <div className="flex flex-row justify-between mt-3">
                <p className="text-center text-sm text-muted-foreground">
                    Built by{" "}
                    <a
                        href="https://twitter.com/0xKofi"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        0xKofi
                    </a>
                    . The source code is available on{" "}
                    <a
                        href="https://github.com/Jam516/BundleBear/tree/main"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        GitHub
                    </a>
                    .
                </p>
                <div className=" flex flex-row gap-3 text-center text-sm text-muted-foreground">
                    Sponsored by{" "}
                    <a
                        href="https://www.pimlico.io/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/pimlico-logo.png" className="h-5" alt="Pimlico" />
                    </a>
                    <a
                        href="https://www.biconomy.io/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/biconomy-logo.png" className="h-5" alt="Biconomy" />
                    </a>
                    {/* <a
                        href="https://twitter.com/0xKofi"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/ethereum-foundation-logo.png" className="h-5" alt="BundleBear" />
                    </a> */}
                </div>
            </div>
        </footer>
    );
}
