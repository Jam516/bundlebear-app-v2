interface AuthContractDataParams {
    chain: string;
    timeframe: string;
}

interface AuthContractData {
    leaderboard: any[],
}

export async function getAuthContractData({ chain, timeframe }: AuthContractDataParams): Promise<AuthContractData> {
    // noStore();
    const response = await fetch(`https://bundlebear-api.onrender.com/eip7702-authorized-contracts?chain=${chain}&timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const authContractData: AuthContractData = await response.json();
    // console.log(authContractData);

    return authContractData;
}