import axios from 'axios';

export default {
  searchShops(shopName) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/hotpepper/gourmet/v1/", {
          params: {
            key: 'a99653fd49e99132',
            keyword: shopName,
            format: 'json'
          }
        })
        .then(response => {
          if (response.data.results.shop && response.data.results.shop.length > 0) {
            resolve(response.data.results.shop);
          } else {
            reject("お店が見つかりませんでした");
          }
        })
        .catch(error => {
          const errorStatus = error.response ? error.response.status : "unknown";
          switch (errorStatus) {
            case 400:
              reject("不正なパラメータが指定されました");
              break;
            case 401:
              reject("不正なアクセスです");
              break;
            case 404:
              reject("お店が見つかりませんでした");
              break;
            case 429:
              reject("リクエスト回数上限超過");
              break;
            case 500:
              reject("処理中にエラーが発生しました");
              break;
            default:
              reject("不明なエラーです");
              break;
          }
        });
    });
  }
};
