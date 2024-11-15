import axios from 'axios';

const applicationId = '1059525300281571788';


async function fetchCategories(categoryType) {
  const url = `https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${applicationId}&categoryType=large`;
  
  try {
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export default fetchCategories;
