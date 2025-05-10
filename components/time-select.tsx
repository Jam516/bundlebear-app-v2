"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from "react";

type TimeOption = 'day' | 'week' | 'month';

interface TimeSelectProps {
    defaultTime?: TimeOption;
}

export function TimeSelect({ defaultTime = 'week' }: TimeSelectProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState<TimeOption>(defaultTime);

    const handleSelect = (newValue: string) => {
        const segments = pathname.split("/");
        const pathcore = segments.slice(0, 3).join('/');
        // const pathcore = segments.slice(0, 3).join('/');
        return router.push(`${pathcore}/${newValue}`);
    };

    useEffect(() => {
        const slugTime = pathname.split("/")[3] as TimeOption | undefined;
        if (slugTime === undefined) {
            setActiveTab(defaultTime);
        } else {
            setActiveTab(slugTime);
        }
    }, [pathname, defaultTime]);

    return (
        <Select onValueChange={handleSelect} value={activeTab}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Toggle Chart Settings" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="month">MONTHLY CHARTS</SelectItem>
                <SelectItem value="week">WEEKLY CHARTS</SelectItem>
                <SelectItem value="day">DAILY CHARTS</SelectItem>
            </SelectContent>
        </Select>
    )
}
