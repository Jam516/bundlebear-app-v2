"use client";

import { AreaChart, Area, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import moment from 'moment';

type DataEntry = {
    DATE: string;
    CHAIN: string;
    [key: string]: string | number;
};

// New type to define the bars configuration
type AreaConfig = {
    dataKey: string;
    fill: string;
    stroke: string;
};

interface AreaChartProps {
    data: DataEntry[];
    xaxis: string;
    yaxis: string;
    segment: string;
    usd?: boolean;
    isPercentage?: boolean;
    areaConfig: AreaConfig[]; // New parameter to define which bars to include
}

type TransformedEntry = {
    DATE: string;
    [key: string]: string | number;
};

export function UnifiedAreaChart({
    data,
    xaxis,
    yaxis,
    segment,
    usd = false,
    isPercentage = false,
    areaConfig // New parameter
}: AreaChartProps) {
    // Shared data transformation logic
    const transformData = (data: DataEntry[]) => {
        const transformed: { [date: string]: TransformedEntry } = {};

        data.forEach((entry) => {
            const formattedDate = moment(entry.DATE, 'YYYY-MM-DD').format('DD-MMM-YY').toUpperCase();
            if (!transformed[formattedDate]) {
                transformed[formattedDate] = {
                    DATE: formattedDate
                };
            }

            transformed[formattedDate][entry[segment]] = entry[yaxis];
        });

        return Object.values(transformed);
    };

    const transformedData = transformData(data);

    // Percentage formatting functions
    const toPercent = (decimal: number) =>
        `${(decimal * 100).toFixed(2)}%`;

    const toPercentTick = (decimal: number) =>
        `${(decimal * 100).toFixed(0)}%`;

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

    // Custom tooltip component that handles both chart types
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload || !payload.length) return null;

        if (isPercentage) {
            const total = payload.reduce((sum: number, entry: any) => sum + (entry.value || 0), 0);

            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                    <p className="label">{`Date: ${label}`}</p>
                    {payload.map((entry: any, index: number) => {
                        const percentage = (entry.value / total) * 100;
                        return (
                            <p key={`item-${index}`} style={{ color: entry.color }}>
                                {`${entry.name}: ${toPercent(percentage / 100)}`}
                            </p>
                        );
                    })}
                </div>
            );
        }

        // Standard tooltip for non-percentage mode - still showing full values
        return (
            <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                <p className="label">{`Date: ${label}`}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={`item-${index}`} style={{ color: entry.color }}>
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
            <AreaChart
                data={transformedData}
                stackOffset={isPercentage ? "expand" : "none"}
            >
                {!isPercentage && (
                    <CartesianGrid vertical={false} horizontal={true} strokeDasharray="3 3" />
                )}
                <XAxis
                    dataKey={xaxis}
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
                        : (value: number) => {
                            const formattedValue = formatShortNumber(value);
                            if (usd) {
                                // Check if the value is negative
                                return value < 0
                                    ? `-$${formattedValue.substring(1)}` // Place $ after the negative sign
                                    : `$${formattedValue}`;
                            }
                            return formattedValue;
                        }
                    }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {/* Dynamically render the Bar components based on the barConfig parameter */}
                {areaConfig.map((bar) => (
                    <Area
                        type="monotone"
                        key={`area-${bar.dataKey}`}
                        dataKey={bar.dataKey}
                        stackId="1"
                        fill={bar.fill}
                        stroke={bar.stroke}
                    // strokeWidth={0}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
}