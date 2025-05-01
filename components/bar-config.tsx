// Define the BarConfig type
export type BarConfig = {
    dataKey: string;
    fill: string;
};

// Bundler bar configuration
export const BUNDLER_BARS: BarConfig[] = [
    { dataKey: "pimlico", fill: "#7115AA" },
    { dataKey: "alchemy", fill: "#118AB2" },
    { dataKey: "etherspot", fill: "#FAC748" },
    { dataKey: "stackup", fill: "#1D2F6F" },
    { dataKey: "unipass", fill: "#B6D6CC" },
    { dataKey: "candide", fill: "#F5D491" },
    { dataKey: "biconomy", fill: "#FF4E17" },
    { dataKey: "coinbase", fill: "#0052FF" },
    { dataKey: "Unknown", fill: "#707070" },
    { dataKey: "particle", fill: "#F386FF" },
    { dataKey: "cometh", fill: "#5F6D81" }
];

// Paymaster bar configuration
export const PAYMASTER_BARS: BarConfig[] = [
    { dataKey: "biconomy", fill: "#FF4E17" },
    { dataKey: "pimlico", fill: "#7115AA" },
    { dataKey: "safe", fill: "#2A9D8F" },
    { dataKey: "stackup", fill: "#1D2F6F" },
    { dataKey: "candide", fill: "#F5D491" },
    { dataKey: "alchemy", fill: "#118AB2" },
    { dataKey: "blocto", fill: "#B6D6CC" },
    { dataKey: "coinbase", fill: "#0052FF" },
    { dataKey: "Unknown", fill: "#707070" },
    { dataKey: "circle", fill: "#008000" },
    { dataKey: "nani", fill: "#FFC6FF" }
];

export const PAYMASTER_TYPE_BARS: BarConfig[] = [
    { dataKey: "Sponsored", fill: "#FF4E17" },
    { dataKey: "ERC20", fill: "#7115AA" },
    { dataKey: "unlabeled", fill: "#707070" }
];

export const CHAIN_BARS: BarConfig[] = [
    { dataKey: "base", fill: "#90C2E7" },
    { dataKey: "polygon", fill: "#A982ED" },
    { dataKey: "arbitrum", fill: "#3454D1" },
    { dataKey: "worldchain", fill: "#121212" },
    { dataKey: "optimism", fill: "#D1345B" },
    { dataKey: "arbitrum_nova", fill: "#FF7700" },
    { dataKey: "celo", fill: "#FCFF52" },
    { dataKey: "avalanche", fill: "#823038" },
    { dataKey: "bsc", fill: "#F0B90B" },
    { dataKey: "linea", fill: "#fff069" },
    { dataKey: "ethereum", fill: "#777780" },
    { dataKey: "gnosis", fill: "#0d8f75" }
];