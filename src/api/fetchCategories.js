import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { applicationId, apiKey } from './config';

async function fetchCategories() {
  const url = `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${applicationId}&categoryType=large&formatVersion=2`;
  
  try {
    const response = await axios.get(url);
    console.log(response.data); // レスポンスデータをログ出力
    return response.data.result.large; // 大カテゴリのデータを返す
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export default fetchCategories;
