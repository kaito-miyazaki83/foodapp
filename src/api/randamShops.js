import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { applicationId, apiKey } from './config';

async function randamShops(lat, lng) {
  const url = '/api/hotpepper/gourmet/v1/';
  const params = {
    key: apiKey,
    lat: lat,
    lng: lng,
    range: 5,  // 範囲を5に設定（3000m以内）
    order: 4,  // おススメ順にソート
    count: 10,  // 1ページあたりの取得件数
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

export default randamShops;
