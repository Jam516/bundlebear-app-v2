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
}

export function MultiopBarChart({
    data,
    xaxis,
    yaxis
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

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                data={data}
                barCategoryGap={0}
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
                    domain={[0, 100]}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: number) => `${value.toLocaleString()}%`}
                />

                <Tooltip
                    formatter={(value, name) => {
                        return [`${Number(value).toFixed(2)}%`, name];
                    }}
                />
                {/* <Legend /> */}
                <Bar dataKey={yaxis} name={yaxis} fill="#90C2E7" />
            </BarChart>
        </ResponsiveContainer>
    );
}