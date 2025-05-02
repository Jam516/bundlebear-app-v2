"use client"

import type * as React from "react"
import {
    // AudioWaveform,
    BookOpen,
    // Bot,
    // Command,
    // Frame,
    // GalleryVerticalEnd,
    // Map,
    LayoutDashboard,
    List,
    SquareActivity,
    // Settings2,
    // SquareTerminal,
} from "lucide-react"
import Link from "next/link"

import { NavMain } from "./nav-main"
import { NavResources } from "./nav-resources"
import {
    Sidebar,
    SidebarContent,
    SidebarRail,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
    navMain: [
        {
            title: "ERC-4337",
            url: "/erc4337-overview/all",
            icon: LayoutDashboard,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/erc4337-overview/all",
                },
                {
                    title: "Bundlers",
                    url: "/erc4337-bundlers/all",
                },
                {
                    title: "Paymasters",
                    url: "/erc4337-paymasters/all",
                },
                {
                    title: "Account Factories",
                    url: "/erc4337-factories/all",
                },
                {
                    title: "Apps",
                    url: "/erc4337-apps/all",
                },
            ],
        },
        {
            title: "ERC-7702",
            url: "/erc7702-overview/all",
            icon: SquareActivity,
            items: [
                {
                    title: "Overview",
                    url: "/erc7702-overview/all",
                },
                // {
                //     title: "Apps",
                //     url: "#",
                // },
            ],
        },
    ],
    resources: [
        {
            name: "Research",
            url: "/research",
            icon: BookOpen,
        },
        {
            name: "Operator Registry",
            url: "https://github.com/Jam516/BundleBear",
            icon: List,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/erc4337-overview/all">
                                <img src="/bear.png" className="h-5" alt="BundleBear" />
                                <span className="text-base font-semibold">BundleBear</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavResources projects={data.resources} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
