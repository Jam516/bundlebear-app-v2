import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { AboutBlock } from "@/components/about-block";
import { SiteFooter } from "@/components/footer";

export default function Loading() {

    return (
        <>
            <div className="hidden md:flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">

                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">ERC-4337 Account Activation</h2>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
                    <Skeleton className="h-[462px]" />
                    <Skeleton className="h-[462px]" />
                </div>
                <Separator />
                <AboutBlock />
                <SiteFooter />
            </div>
        </>

    );
}