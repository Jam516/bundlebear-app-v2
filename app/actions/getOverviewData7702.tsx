interface OverviewDataParams {
    chain: string;
    timeframe: string;
}

interface ChainData {
    stat_live_smart_wallets: { LIVE_SMART_WALLETS: number }[],
    stat_authorizations: { NUM_AUTHORIZATIONS: number }[],
    stat_set_code_txns: { NUM_SET_CODE_TXNS: number }[],
    authorizations_chart: any[],
    set_code_chart: any[],
    live_smart_wallets_chart: any[],
    live_authorized_contracts_chart: any[],
    active_smart_wallets_chart: any[],
    smart_wallet_actions: any[],
    smart_wallet_actions_type: any[],

}

export async function getOverviewData7702({ chain, timeframe }: OverviewDataParams): Promise<ChainData> {
    const response = await fetch(`https://bundlebear-api.onrender.com/eip7702-overview?chain=${chain}&timeframe=${timeframe}`);
    // , { next: { revalidate: 3600 } }

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const chainData: ChainData = await response.json();
    // console.log(chainData.live_smart_wallets_chart);
    // const entriesForMay11 = chainData.live_smart_wallets_chart.filter(
    //     entry => entry.DATE === "2025-05-11"
    // );
    // console.log("Entries for May 11th:", entriesForMay11);

    return chainData;
}