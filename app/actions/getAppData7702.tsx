interface AppDataParams {
    chain: string;
    timeframe: string;
}

interface AppData {
    usage_chart: any[],
    noncrime_usage_chart: any[]
}

export async function getAppData7702({ chain, timeframe }: AppDataParams): Promise<AppData> {
    const response = await fetch(`https://bundlebear-api.onrender.com/eip7702-apps?chain=${chain}&timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const appData: AppData = await response.json();

    return appData;
}