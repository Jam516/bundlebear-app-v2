interface DeployerDataParams {
    chain: string;
    timeframe: string;
}

interface DeployerData {
    leaderboard: any[],
    deployments_chart: any[],
    accounts_chart: any[],
}

export async function getDeployerData({ chain, timeframe }: DeployerDataParams): Promise<DeployerData> {
    const response = await fetch(`https://bundlebear-api.onrender.com/account_deployer?chain=${chain}&timeframe=${timeframe}`, {
        headers: {
            'X-API-Password': process.env.API_PASSWORD || ''
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const deployerData: DeployerData = await response.json();

    return deployerData;
}