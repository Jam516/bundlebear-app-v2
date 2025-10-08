interface ActivationDataParams {
    chain: string;
    timeframe: string;
}

interface ActivationData {
    new_users_provider_chart: any[],
    new_users_chain_chart: any[]
}

export async function getActivationData({ chain, timeframe }: ActivationDataParams): Promise<ActivationData> {
    const response = await fetch(`https://bundlebear-api.onrender.com/erc4337-activation?chain=${chain}&timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const activationData: ActivationData = await response.json();

    return activationData;
}