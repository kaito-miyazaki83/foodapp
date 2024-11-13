const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });

exports.searchShops = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const shopName = req.query.shopName;
    axios.get('http://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
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
});

