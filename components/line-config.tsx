// Define the BarConfig type
export type LineConfig = {
    dataKey: string;
    stroke: string;
};

// Bundler bar configuration
export const BUNDLER_LINES: LineConfig[] = [
    { dataKey: "pimlico", stroke: "#7115AA" },
    { dataKey: "alchemy", stroke: "#118AB2" },
    { dataKey: "etherspot", stroke: "#FAC748" },
    { dataKey: "stackup", stroke: "#1D2F6F" },
    { dataKey: "unipass", stroke: "#B6D6CC" },
    { dataKey: "candide", stroke: "#F5D491" },
    { dataKey: "biconomy", stroke: "#FF4E17" },
    { dataKey: "coinbase", stroke: "#0052FF" },
    { dataKey: "Unknown", stroke: "#707070" },
    { dataKey: "particle", stroke: "#F386FF" },
    { dataKey: "cometh", stroke: "#5F6D81" }
];

export const PAYMASTER_LINES: LineConfig[] = [
    { dataKey: "biconomy", stroke: "#FF4E17" },
    { dataKey: "pimlico", stroke: "#7115AA" },
    { dataKey: "safe", stroke: "#2A9D8F" },
    { dataKey: "stackup", stroke: "#1D2F6F" },
    { dataKey: "candide", stroke: "#F5D491" },
    { dataKey: "alchemy", stroke: "#118AB2" },
    { dataKey: "blocto", stroke: "#B6D6CC" },
    { dataKey: "coinbase", stroke: "#0052FF" },
    { dataKey: "Unknown", stroke: "#707070" },
    { dataKey: "circle", stroke: "#008000" },
    { dataKey: "ambire", stroke: "#A36EFD" },
    { dataKey: "nani", stroke: "#FFC6FF" }
];