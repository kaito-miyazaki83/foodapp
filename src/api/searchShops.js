import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { applicationId, apiKey } from './config';

async function searchShops(shopName) {
  const url = '/api/hotpepper/gourmet/v1/';
  const params = {
    key: apiKey,
    keyword: shopName,
    format: 'json'
  };

  try {
    const response = await axios.get(url, { params });
    const shops = response.data.results.shop;

    if (!shops || shops.length === 0) {
      throw new Error('お店が見つかりませんでした。');
    }

    return shops;
  } catch (error) {
    console.error('Error fetching shops:', error.message || error);
    throw error;
  }
}

export default searchShops;
