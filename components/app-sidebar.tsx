"use client"

import type * as React from "react"
import {
    // AudioWaveform,
    // BookOpen,
    Bot,
    // Command,
    Frame,
    // GalleryVerticalEnd,
    // Map,
    PieChart,
    // Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavResources } from "./nav-resources"
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar"

const data = {
    navMain: [
        {
            title: "ERC-4337",
            url: "/erc4337-overview/all",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/erc4337-overview/all",
                },
                {
                    title: "Bundlers",
                    url: "#",
                },
                {
                    title: "Paymasters",
                    url: "#",
                },
                {
                    title: "Account Factories",
                    url: "#",
                },
                {
                    title: "Apps",
                    url: "#",
                },
            ],
        },
        {
            title: "ERC-7702",
            url: "/erc7702-overview/all",
            icon: Bot,
            items: [
                {
                    title: "Overview",
                    url: "/erc7702-overview/all",
                },
                {
                    title: "Apps",
                    url: "#",
                },
            ],
        },
    ],
    resources: [
        {
            name: "Research",
            url: "#",
            icon: Frame,
        },
        {
            name: "Operator Registry",
            url: "#",
            icon: PieChart,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavResources projects={data.resources} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
