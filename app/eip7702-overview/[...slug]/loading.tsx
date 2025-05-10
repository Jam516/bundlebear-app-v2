import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {

    return (
        <>
            <div className="hidden md:flex flex-col space-y-4 p-8 font-[family-name:var(--font-inter-sans)]">

                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">EIP-7702 Metrics</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <Skeleton className="h-[125px]" />
                    <Skeleton className="h-[125px]" />
                    <Skeleton className="h-[125px]" />
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
                    <Skeleton className="h-[462px]" />
                    <Skeleton className="h-[462px]" />
                </div>

            </div>
        </>

    );
}