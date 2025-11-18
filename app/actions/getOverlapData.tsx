interface OverlapDataParams {
    chain: string;
    timeframe: string;
}

interface OverlapData {
    eip7702_x_erc4337_userops: any[],
    eip7702_x_erc4337_accounts: any[]
}

export async function getOverlapData({ chain, timeframe }: OverlapDataParams): Promise<OverlapData> {
    const response = await fetch(`https://bundlebear-api.onrender.com/eip7702-x-erc4337?chain=${chain}&timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const overlapData: OverlapData = await response.json();

    return overlapData;
}