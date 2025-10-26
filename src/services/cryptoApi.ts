import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export interface CryptoPrice {
  [key: string]: {
    usd: number;
  };
}

export async function getCryptoPrices(): Promise<CryptoPrice> {
  const response = await axios.get(API_URL, {
    params: {
      ids: 'bitcoin,ethereum,cardano,dogecoin',
      vs_currencies: 'usd',
    },
  });
  return response.data;
}
