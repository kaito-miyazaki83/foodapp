<template>
  <div>
    <input v-model="shopName" placeholder="お店の名前" />
    <button @click="searchShops">検索</button>
    <ul class="shop-list">
      <li v-for="shop in shops" :key="shop.id" class="shop-item">
        <img v-if="shop.photo && shop.photo.pc && shop.photo.pc.l" :src="shop.photo.pc.l" alt="shop image" class="shop-image" />
        <div class="shop-info">
          <a :href="shop.urls.pc" target="_blank" class="shop-name">{{ shop.name }}</a>
          <p class="shop-address">{{ shop.address }}</p>
        </div>
      </li>
    </ul>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import searchShopsAPI from '@/api/searchShops';

export default {
  data() {
    return {
      shopName: '',
      shops: [],
      errorMessage: '',
    };
  },
  methods: {
    async searchShops() {
      try {
        const shops = await searchShopsAPI.searchShops(this.shopName);
        this.shops = shops;
        this.errorMessage = '';
      } catch (error) {
        this.shops = [];
        this.errorMessage = error.message;
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.shop-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.shop-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}
.shop-image {
  width: 180px;
  height: 180px;
  margin-bottom: 10px;
}
.shop-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.shop-name {
  font-size: 1.2em;
  margin-bottom: 5px;
}
.shop-address {
  color: #555;
}
</style>
