export function SiteFooter() {
    return (
        <footer className="border-t border-gray-300">
            <div className="flex flex-col mt-3">
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
            </div>
        </footer>
    );
}
