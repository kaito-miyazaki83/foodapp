const API_KEY = 'a99653fd49e99132';
const KEYWORD = '寿司 東京'; // より具体的なキーワードに変更
const API_URL = 'http://webservice.recruit.co.jp/hotpepper/shop/v1/';

const URL = `${API_URL}?key=${API_KEY}&keyword=${encodeURIComponent(KEYWORD)}&format=json`;

async function main() {
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.text();
    const obj = JSON.parse(data);

    if (obj.results.shop && obj.results.shop.length > 0) {
      const topShops = obj.results.shop.slice(0, 10); // 上位10件のみ取得

      topShops.forEach((shop, index) => {
        console.log(`店名: ${shop.name}`);
        console.log(`住所: ${shop.address}`);
        console.log(`URL: ${shop.urls.pc}`);
        console.log('-----------------------------------');
      });
    } else {
      console.log('No shops found for the given keyword.');
    }
  } catch (err) {
    console.error(err);
  }
}

main();
