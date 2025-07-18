// import { unstable_noStore as noStore } from "next/cache";

interface AppDataParams {
    chain: string;
    timeframe: string;
}

interface AppData {
    usage_chart: any[],
    leaderboard: any[],
    ops_chart: any[],
    ops_paymaster_chart: any[]
}

export async function getAppData({ chain, timeframe }: AppDataParams): Promise<AppData> {
    // noStore();
    const response = await fetch(`https://bundlebear-api.onrender.com/apps?chain=${chain}&timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const appData: AppData = await response.json();

    return appData;
}