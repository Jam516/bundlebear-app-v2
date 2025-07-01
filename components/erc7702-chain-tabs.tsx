"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from 'next/navigation'

export function ChainTabs7702() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("all");

    const handleTabChange = (newValue: string) => {
        const segments = pathname.split("/");

        if (segments[1] === 'entity') {
            return router.push(`/${segments[1]}/${newValue}/${segments[3]}/${segments[4]}`);
        } else {
            return router.push(`/${segments[1]}/${newValue}`);
        }
    };

    useEffect(() => {
        const segments = pathname.split("/");
        setActiveTab(segments[2]);
    }, [pathname]);

    const segments = pathname.split("/");

    const visibleRoutes = ['eip7702-overview', 'eip7702-authorized-contracts'];

    if (!visibleRoutes.includes(segments[1])) {
        return null; // Return null instead of empty div for cleaner rendering
    }

    return (
        <Tabs defaultValue="all" className="space-y-4 pt-6" onValueChange={handleTabChange} value={activeTab}>
            <TabsList>
                <TabsTrigger value="all">Cross-chain</TabsTrigger>
                <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                <TabsTrigger value="bsc">BSC</TabsTrigger>
                <TabsTrigger value="base">Base</TabsTrigger>
                <TabsTrigger value="optimism">Optimism</TabsTrigger>
                <TabsTrigger value="arbitrum">Arbitrum</TabsTrigger>
                <TabsTrigger value="unichain">Unichain</TabsTrigger>
                <TabsTrigger value="gnosis">Gnosis</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}