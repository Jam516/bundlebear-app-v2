"use client";

import { Bar, BarChart, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import moment from 'moment';

// Simple data type without segments
type DataEntry = {
    [key: string]: string | number;
};

interface SimpleBarChartProps {
    data: DataEntry[];
    xaxis: string;
    yaxis: string;
    usd?: boolean;
}

export function SimpleBarChart({
    data,
    xaxis,
    yaxis,
    usd = false
}: SimpleBarChartProps) {
    // Number shortening function for Y-axis
    const formatShortNumber = (num: number): string => {
        if (num === 0) return '0';

        const isNegative = num < 0;
        const absNum = Math.abs(num);

        if (absNum < 1000) {
            return isNegative ? `-${absNum}` : `${absNum}`;
        } else if (absNum < 1000000) {
            return `${isNegative ? '-' : ''}${(absNum / 1000).toFixed(1).replace(/\.0$/, "")}k`;
        } else if (absNum < 1000000000) {
            return `${isNegative ? '-' : ''}${(absNum / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
        } else if (absNum < 1000000000000) {
            return `${isNegative ? '-' : ''}${(absNum / 1000000000).toFixed(1).replace(/\.0$/, "")}B`;
        } else {
            return `${isNegative ? '-' : ''}${(absNum / 1000000000000).toFixed(1).replace(/\.0$/, "")}T`;
        }
    };

    // Type definitions for the tooltip
    interface TooltipPayloadItem {
        value: number;
        name: string;
        color: string;
        dataKey: string;
        payload?: Record<string, any>;
    }

    interface CustomTooltipProps {
        active?: boolean;
        payload?: TooltipPayloadItem[];
        label?: string;
    }

    // Simplified custom tooltip component
    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
        if (!active || !payload || !payload.length) return null;

        return (
            <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                <p className="label">{`${xaxis}: ${label}`}</p>
                {payload.map((entry: TooltipPayloadItem, index: number) => (
                    <p key={`item-${index}`} style={{ color: entry.color }}>
                        {`${entry.name}: ${usd ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}`}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                data={data}
                barCategoryGap={10}
            >
                <CartesianGrid vertical={false} horizontal={true} strokeDasharray="3 3" />
                <XAxis
                    dataKey={xaxis}
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => {
                        return moment(value).format('DD-MMM-YYYY').toUpperCase();
                    }}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: number) => {
                        const formattedValue = formatShortNumber(value);
                        return usd ? `$${formattedValue}` : formattedValue;
                    }}
                />
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend /> */}
                <Bar dataKey={yaxis} name={yaxis} fill="#90C2E7" />
            </BarChart>
        </ResponsiveContainer>
    );
}