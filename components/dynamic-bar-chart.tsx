"use client";

import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import moment from 'moment';

type DataEntry = {
    DATE: string;
    NUM_UNIQUE_SENDERS: number;
    PROJECT: string;
};
type TransformedEntry = {
    DATE: string;
    [key: string]: string | number;
};

interface DynamicBarChartProps {
    data: DataEntry[];
    // Optional color map for known projects
    colorMap?: Record<string, string>;
    // DateFormat for x-axis (optional)
    dateFormat?: string;
    // Height of the chart
    height?: number;
    // Display as percentage stack (100% stacked)
    isPercentage?: boolean;
}

// Generate a consistent color based on string
const stringToColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
};

export function DynamicBarChart({
    data,
    colorMap = {
        Cyberconnect: '#2A9D8F',
        CYBER: '#15514A',
        xFANTV: '#F386FF',
        G1: '#EA5230',
        direct_transfer: '#FAC748',
        Other: '#525252',
        other: '#525252',
        CapX: '#B42318',
        USDC: '#118AB2',
        Fantazy: '#F7E3AF',
        "Burn Address": '#171717',
        Superfluid: '#1DB227',
        ALFA: '#0400F5',
        DEGEN: '#A36EFD',
        DEGENx: '#532E9F',
        Piggybox: '#00D632',
        "Anichess Orb Token Claim": '#43D0D7',
        Uniswap: '#ff38c7',
        PancakeSwap: '#d1884f',
        Relay: '#6f57cf',
        "$USDC": '#2170c4',
        "$USDT": '#008f8c',
        Opensea: '#0088ff',
        WETH: '#eb1e77',
        "Layer3 Cube": '#101014'
    },
    dateFormat = 'DD-MMM-YY',
    height = 400,
    isPercentage = false
}: DynamicBarChartProps) {
    // Transform data for Recharts
    const { transformedData, uniqueProjects } = useMemo(() => {
        // Group by date
        const dateGroups: Record<string, TransformedEntry> = {};

        // First, collect all unique projects
        const projectSet = new Set<string>();

        // Process each data entry
        data.forEach(entry => {
            const formattedDate = moment(entry.DATE).format(dateFormat);
            projectSet.add(entry.PROJECT);

            if (!dateGroups[formattedDate]) {
                dateGroups[formattedDate] = { DATE: formattedDate };
            }

            // Add value to the correct project for this date
            dateGroups[formattedDate][entry.PROJECT] =
                (dateGroups[formattedDate][entry.PROJECT] as number || 0) + entry.NUM_UNIQUE_SENDERS;
        });

        // Convert to array for Recharts
        const transformedData = Object.values(dateGroups);

        // Sort by date
        transformedData.sort((a, b) => {
            return moment(a.DATE, dateFormat).valueOf() - moment(b.DATE, dateFormat).valueOf();
        });

        return {
            transformedData,
            uniqueProjects: Array.from(projectSet)
        };
    }, [data, dateFormat]);

    // Percentage formatting functions
    const toPercent = (decimal: number) => `${(decimal * 100).toFixed(2)}%`;
    const toPercentTick = (decimal: number) => `${(decimal * 100).toFixed(0)}%`;

    // Custom tooltip to display values
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload || !payload.length) return null;

        if (isPercentage) {
            const total = payload.reduce((sum: number, entry: any) => sum + (entry.value || 0), 0);

            return (
                <div className="custom-tooltip" style={{
                    backgroundColor: 'white',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <p className="date" style={{
                        fontWeight: 'bold',
                        marginBottom: '8px'
                    }}>{`Date: ${label}`}</p>
                    {payload.map((entry: any, index: number) => {
                        const percentage = total > 0 ? (entry.value / total) * 100 : 0;
                        return (
                            <div key={`item-${index}`} style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '4px'
                            }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: entry.color,
                                    marginRight: '8px'
                                }}></div>
                                <p style={{ margin: 0 }}>{`${entry.name}: ${toPercent(percentage / 100)}`}</p>
                            </div>
                        );
                    })}
                </div>
            );
        }

        // Standard tooltip for non-percentage mode
        return (
            <div className="custom-tooltip" style={{
                backgroundColor: 'white',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <p className="date" style={{
                    fontWeight: 'bold',
                    marginBottom: '8px'
                }}>{`Date: ${label}`}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={`item-${index}`} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '4px'
                    }}>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: entry.color,
                            marginRight: '8px'
                        }}></div>
                        <p style={{ margin: 0 }}>{`${entry.name}: ${entry.value.toLocaleString()}`}</p>
                    </div>
                ))}
            </div>
        );
    };

    // Generate chart
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                data={transformedData}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 10
                }}
                stackOffset={isPercentage ? "expand" : "none"}
                barCategoryGap={0}
            >
                {!isPercentage && (
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                )}
                <XAxis
                    dataKey="DATE"
                    stroke="#888888"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={20}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={isPercentage
                        ? toPercentTick
                        : (value) => {
                            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                            if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
                            return value.toString();
                        }
                    }
                />
                <Tooltip content={<CustomTooltip />} />

                {/* Dynamically render bars for each unique project */}
                {uniqueProjects.map((project) => (
                    <Bar
                        key={project}
                        dataKey={project}
                        stackId="a"
                        name={project}
                        fill={colorMap[project] || stringToColor(project)}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}