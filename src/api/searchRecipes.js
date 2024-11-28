import axios from 'axios';

import { applicationId, apiKey } from './config';
async function searchRecipes(categoryId) {
  const url = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${applicationId}&categoryId=${categoryId}&formatVersion=2`;
  
  try {
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

export default searchRecipes;
