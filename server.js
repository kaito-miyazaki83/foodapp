const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001; // ポート番号を指定
const apiUrl = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/';


// メインルートの設定
app.get('/', (req, res) => {
  res.send('Welcome to the Hot Pepper API Relay Server!');
});

app.get('/api/searchShops', (req, res) => {
  const { shopName } = req.query;
  axios.get(apiUrl, {
    params: {
      key: 'a99653fd49e99132',
      keyword: shopName,
      format: 'json'
    }
  })
  .then(response => {
    res.json(response.data.results.shop);
  })
  .catch(error => {
    res.status(error.response ? error.response.status : 500).send(error.message);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

