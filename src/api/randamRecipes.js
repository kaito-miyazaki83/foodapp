import axios from 'axios';

import { applicationId, apiKey } from './config';

async function getCategories() {
  const url = `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?format=json&applicationId=${applicationId}`;
  
  try {
    const response = await axios.get(url);
    const categories = response.data.result.large;
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error.message || error);
    throw error;
  }
}

async function randamRecipes() {
  try {
    const categories = await getCategories();
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryId = randomCategory.categoryId;

    const recipeUrl = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${applicationId}&categoryId=${categoryId}&formatVersion=2`;
    const response = await axios.get(recipeUrl);
    const recipes = response.data.result;

    if (!recipes || recipes.length === 0) {
      throw new Error('レシピが見つかりませんでした。');
    }

    const randomRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 10);
    return randomRecipes;
  } catch (error) {
    console.error('Error fetching recipes:', error.message || error);
    console.log('Request URL:'); // リクエストURLをログ出力
    throw error;
  }
}

export default randamRecipes;
