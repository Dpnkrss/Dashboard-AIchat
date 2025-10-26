import axios from 'axios';

export interface HistoryData {
  prices: [number, number][];
}

export async function getCryptoHistory(id: string): Promise<HistoryData> {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart`;
  const response = await axios.get(url, {
    params: { vs_currency: 'usd', days: 7 }, // last 7 days
  });
  return response.data;
}
