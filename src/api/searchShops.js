import axios from 'axios';

const searchShops = (shopName) => {
  return new Promise((resolve, reject) => {
    axios.get('https://foodapp-2291b.cloudfunctions.net/searchShops', {
      params: {
        shopName: shopName
      }
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error.message);
    });
  });
};

export default searchShops;

