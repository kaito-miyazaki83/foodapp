import axios from 'axios';

import { applicationId, apiKey } from './config';

async function searchShopsByQuery(query) {
  const url = '/api/hotpepper/gourmet/v1/';
  const params = {
    key: apiKey,
    keyword: query,
    format: 'json'
  };

  try {
    const response = await axios.get(url, { params });
    const shops = response.data.results.shop;

    if (!shops || shops.length === 0) {
      throw new Error('お店が見つかりませんでした。');
    }

    // ランダムにお店を選択
    const randomShops = shops.sort(() => 0.5 - Math.random()).slice(0, 10);
    return randomShops;
  } catch (error) {
    console.error('Error fetching shops:', error.message || error);
    throw error;
  }
}

export default searchShopsByQuery;
