// Define the BarConfig type
export type BarConfig = {
    dataKey: string;
    fill: string;
};

// Bundler bar configuration
export const BUNDLER_BARS: BarConfig[] = [
    { dataKey: "alchemy", fill: "#118AB2" },
    { dataKey: "pimlico", fill: "#7115AA" },
    { dataKey: "coinbase", fill: "#0052FF" },
    { dataKey: "biconomy", fill: "#FF4E17" },
    { dataKey: "particle", fill: "#F386FF" },
    { dataKey: "stackup", fill: "#1D2F6F" },
    { dataKey: "thirdweb", fill: "#a50cb3" },
    { dataKey: "Send", fill: "#3efa4e" },
    { dataKey: "cometh", fill: "#5F6D81" },
    { dataKey: "candide", fill: "#F5D491" },
    { dataKey: "etherspot", fill: "#FAC748" },
    { dataKey: "unipass", fill: "#B6D6CC" },
    { dataKey: "Unknown", fill: "#707070" }
];

// Paymaster bar configuration
export const PAYMASTER_BARS: BarConfig[] = [
    { dataKey: "pimlico", fill: "#7115AA" },
    { dataKey: "biconomy", fill: "#FF4E17" },
    { dataKey: "alchemy", fill: "#118AB2" },
    { dataKey: "stackup", fill: "#1D2F6F" },
    { dataKey: "coinbase", fill: "#0052FF" },
    { dataKey: "particle", fill: "#F386FF" },
    { dataKey: "circle", fill: "#008000" },
    { dataKey: "blocto", fill: "#B6D6CC" },
    { dataKey: "thirdweb", fill: "#a50cb3" },
    { dataKey: "candide", fill: "#F5D491" },
    { dataKey: "send", fill: "#2A9D8F" },
    { dataKey: "cometh", fill: "#5F6D81" },
    { dataKey: "ambire", fill: "#A36EFD" },
    { dataKey: "nani", fill: "#FFC6FF" },
    { dataKey: "etherspot", fill: "#FAC748" },
    { dataKey: "Unknown", fill: "#707070" }
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

export const ENGAGEMENT_BARS: BarConfig[] = [
    { dataKey: "01 UserOp", fill: "#333333" },
    { dataKey: "02-10 UserOps", fill: "#A982ED" },
    { dataKey: "More than 10 UserOps", fill: "#D1345B" }
];

export const FACTORY_BARS: BarConfig[] = [
    { dataKey: "alchemy", fill: "#1167b1" },
    { dataKey: "zerodev_kernel", fill: "#118AB2" },
    { dataKey: "simpleaccount", fill: "#69995D" },
    { dataKey: "biconomy", fill: "#FF4E17" },
    { dataKey: "lumx", fill: "#6E05FF" },
    { dataKey: "coinbase_smart_wallet", fill: "#C4DD45" },
    { dataKey: "thirdweb_managedaccount", fill: "#D110A9" },
    { dataKey: "thirdweb_default", fill: "#D110A9" },
    { dataKey: "circle", fill: "#008000" },
    { dataKey: "kresus_vault", fill: "#B6D6CC" },
    { dataKey: "nani", fill: "#FFC6FF" },
    { dataKey: "etherspot", fill: "#FAC748" },
    { dataKey: "candide", fill: "#F5D491" },
    { dataKey: "ambire", fill: "#A36EFD" },
    { dataKey: "banana", fill: "#F8E9E9" },
    { dataKey: "fun.xyz", fill: "#3D3D3D" },
    { dataKey: "Unknown", fill: "#707070" }
];

export const CHAIN_BARS_7702: BarConfig[] = [
    { dataKey: "ethereum", fill: "#777780" },
    { dataKey: "bsc", fill: "#F0B90B" },
    { dataKey: "base", fill: "#90C2E7" },
    { dataKey: "optimism", fill: "#D1345B" },
    { dataKey: "gnosis", fill: "#0d8f75" },
];

export const TXN_TYPE_BARS_7702: BarConfig[] = [
    { dataKey: "relayed action", fill: "#0d8f75" },
    { dataKey: "erc-4337 userop", fill: "#777780" },
    { dataKey: "self-initated txn", fill: "#F0B90B" },
    { dataKey: "eoa txn", fill: "#90C2E7" }
];