<template>
  <div>
    <input v-model="shopName" placeholder="お店の名前" />
    <button @click="searchShops">検索</button>
    <ul>
      <li v-for="shop in shops" :key="shop.id">{{ shop.name }} - {{ shop.address }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      shopName: '',
      shops: []
    };
  },
  methods: {
    searchShops() {
      axios.get('https://us-central1-foodapp-2291b.cloudfunctions.net/api/searchShops', {
        params: {
          keyword: this.shopName
        }
      })
      .then(response => {
        console.log(response.data); // レスポンスデータをコンソールに表示
        this.shops = response.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
};
</script>

