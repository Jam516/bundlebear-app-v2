"use client";

import { Line, LineChart, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import moment from 'moment';

type DataEntry = {
    DATE: string;
    CHAIN: string;
    [key: string]: string | number;
};

interface BarChartProps {
    data: DataEntry[];
    xaxis: string;
    yaxis: string;
    segment: string;
    usd?: boolean;
    isPercentage?: boolean;
}

type TransformedEntry = {
    DATE: string;
    [key: string]: string | number;
};

export function BundlerLineChart({
    data,
    xaxis,
    yaxis,
    segment,
    usd = false,

}: BarChartProps) {
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
            <LineChart data={transformedData} >
                <CartesianGrid vertical={false} horizontal={true} strokeDasharray="3 3" />
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
                    tickFormatter={(value: number) => {
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
                <Line type="monotone" dataKey="pimlico" stroke="#7115AA" dot={false} />
                <Line type="monotone" dataKey="alchemy" stroke="#118AB2" dot={false} />
                <Line type="monotone" dataKey="etherspot" stroke="#FAC748" dot={false} />
                <Line type="monotone" dataKey="stackup" stroke="#1D2F6F" dot={false} />
                <Line type="monotone" dataKey="unipass" stroke="#B6D6CC" dot={false} />
                <Line type="monotone" dataKey="candide" stroke="#F5D491" dot={false} />
                <Line type="monotone" dataKey="biconomy" stroke="#FF4E17" dot={false} />
                <Line type="monotone" dataKey="coinbase" stroke="#0052FF" dot={false} />
                <Line type="monotone" dataKey="Unknown" stroke="#707070" dot={false} />
                <Line type="monotone" dataKey="particle" stroke="#F386FF" dot={false} />
                <Line type="monotone" dataKey="cometh" stroke="#5F6D81" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}