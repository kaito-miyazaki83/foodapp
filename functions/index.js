const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({ origin: true }));

const apiUrl = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
const apiKey = 'a99653fd49e99132'; // あなたのAPIキーをここに設定

app.get('/searchShops', (req, res) => {
  const { keyword } = req.query;
  axios.get(apiUrl, {
    params: {
      key: apiKey,
      keyword: keyword,
      format: 'json'
    }
  })
  .then(response => {
    res.json(response.data.results.shop);
  })
  .catch(error => {
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.message : error.message;
    res.status(status).send({ message });
  });
});

exports.api = functions.https.onRequest(app);
