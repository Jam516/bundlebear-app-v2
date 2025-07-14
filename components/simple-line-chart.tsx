"use client";

import { Line, LineChart, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import moment from 'moment';

// Simple data type without segments
type DataEntry = {
    [key: string]: string | number;
};

interface SimpleLineChartProps {
    data: DataEntry[];
    xaxis: string;
    yaxis: string;
    usd?: boolean;
}

export function SimpleLineChart({
    data,
    xaxis,
    yaxis,
    usd = false
}: SimpleLineChartProps) {
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
            <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <p className="label" style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{`${xaxis}: ${label}`}</p>
                {payload.map((entry: TooltipPayloadItem, index: number) => (
                    <p key={`item-${index}`} style={{ color: entry.color, margin: '0' }}>
                        {`${entry.name}: ${usd
                            ? entry.value < 0
                                ? `-$${Math.abs(entry.value).toLocaleString()}`
                                : `$${entry.value.toLocaleString()}`
                            : entry.value.toLocaleString()}`}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart
                data={data}
            >
                <CartesianGrid vertical={false} horizontal={true} strokeDasharray="3 3" />
                <XAxis
                    dataKey={xaxis}
                    stroke="#888888"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={20}
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
                        if (usd) {
                            // Check if the value is negative
                            return value < 0
                                ? `-$${formattedValue.substring(1)}` // Place $ after the negative sign
                                : `$${formattedValue}`;
                        }
                        return formattedValue;
                    }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey={yaxis}
                    name={yaxis}
                    stroke="#90C2E7"
                    strokeWidth={2}
                    dot={{ fill: '#90C2E7', r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}