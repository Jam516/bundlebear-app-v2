"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Bundler = {
    BUNDLER_NAME: string
    NUM_USEROPS: number
    NUM_TXNS: number
    REVENUE: number
}

export const bundlercolumns: ColumnDef<Bundler>[] = [
    {
        accessorKey: "BUNDLER_NAME",
        header: "Bundler",
    },
    {
        accessorKey: "NUM_USEROPS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="flex flex-col text-left">
                        <p>Total UserOps</p>
                        <p>Bundled</p>
                    </div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_USEROPS"))

            return <div className="pl-4">{amount.toLocaleString()}</div>
        },
    },
    {
        accessorKey: "NUM_TXNS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="flex flex-col text-left">
                        <p>Total Bundle</p>
                        <p>Txns Executed</p>
                    </div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_TXNS"))

            return <div className="pl-4">{amount.toLocaleString()}</div>
        },
    },
    {
        accessorKey: "REVENUE",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="flex flex-col text-left">
                        <p>Total OnChain</p>
                        <p>Revenue</p>
                    </div>

                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("REVENUE"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="pl-4">{formatted}</div>
        },
    },
]

export type Paymaster = {
    PAYMASTER_NAME: string
    NUM_USEROPS: number
    GAS_SPENT: number
}

export const paymastercolumns: ColumnDef<Paymaster>[] = [
    {
        accessorKey: "PAYMASTER_NAME",
        header: "Paymaster",
    },
    {
        accessorKey: "NUM_USEROPS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total UserOps Served
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_USEROPS"))

            return <div className="text-center font-medium">{amount.toLocaleString()}</div>
        },
    },
    {
        accessorKey: "GAS_SPENT",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Gas Spend
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("GAS_SPENT"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
]

export type Deployer = {
    DEPLOYER_NAME: string
    NUM_ACCOUNTS: number
}

export const deployercolumns: ColumnDef<Deployer>[] = [
    {
        accessorKey: "DEPLOYER_NAME",
        header: "Account Deployer",
    },
    {
        accessorKey: "NUM_ACCOUNTS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Accounts Deployed
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_ACCOUNTS"))

            return <div className="text-center font-medium">{amount.toLocaleString()}</div>
        },
    },
]

export type Apps = {
    PROJECT: string
    NUM_UNIQUE_SENDERS: number
    NUM_OPS: number
}

export const appcolumns: ColumnDef<Apps>[] = [
    {
        accessorKey: "PROJECT",
        header: "Project",
    },
    {
        accessorKey: "NUM_UNIQUE_SENDERS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Users
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_UNIQUE_SENDERS"))

            return <div className="text-center font-medium">{amount.toLocaleString()}</div>
        },
    },
    {
        accessorKey: "NUM_OPS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total UserOps
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_OPS"))

            return <div className="text-center font-medium">{amount.toLocaleString()}</div>
        },
    },
]

export type PaymasterMin = {
    PAYMASTER_NAME: string
    GAS_SPENT: number
}

export const paymastermincolumns: ColumnDef<PaymasterMin>[] = [
    {
        accessorKey: "PAYMASTER_NAME",
        header: "Paymaster",
    },
    {
        accessorKey: "GAS_SPENT",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Gas Spend
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("GAS_SPENT"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
]

export type AuthContracts = {
    AUTHORIZED_CONTRACT: string
    NUM_WALLETS: number
}

export const authcontractcolumns: ColumnDef<AuthContracts>[] = [
    {
        accessorKey: "AUTHORIZED_CONTRACT",
        header: "Authorized Contract",
    },
    {
        accessorKey: "NUM_WALLETS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="flex flex-col text-left">
                        <p>Live Smart Accounts</p>
                    </div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_WALLETS"))

            return <div className="pl-4">{amount.toLocaleString()}</div>
        },
    },
]

export type Overlap4337Contract = {
    AUTHORIZED_CONTRACT: string
    NUM_WALLETS: number
}

export const overlap4337columns: ColumnDef<Overlap4337Contract>[] = [
    {
        accessorKey: "AUTHORIZED_CONTRACT",
        header: "Authorized Contract",
    },
    {
        accessorKey: "NUM_WALLETS",
        header: "EIP-7702 Accounts that made UserOps",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_WALLETS"))

            return <div>{amount.toLocaleString()}</div>
        },
    },
]

export type TransactingContract = {
    AUTHORIZED_CONTRACT: string
    NUM_WALLETS: number
}

export const transactingcontractcolumns: ColumnDef<TransactingContract>[] = [
    {
        accessorKey: "AUTHORIZED_CONTRACT",
        header: "Authorized Contract",
    },
    {
        accessorKey: "NUM_WALLETS",
        header: "Active Wallets (5+ actions)",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_WALLETS"))

            return <div>{amount.toLocaleString()}</div>
        },
    },
]