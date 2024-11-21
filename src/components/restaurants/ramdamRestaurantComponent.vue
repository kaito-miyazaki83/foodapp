<template>
    <div>
      <h1>近くのレストラン</h1>
      <ul class="restaurant-list">
        <li v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-item">
          <img v-if="restaurant.photo.pc.l" :src="restaurant.photo.pc.l" alt="restaurant image" class="restaurant-image" />
          <div class="restaurant-info">
            <h2 class="restaurant-name">{{ restaurant.name }}</h2>
            <p class="restaurant-address">{{ restaurant.address }}</p>
            <p class="restaurant-access">{{ restaurant.access }}</p>
            <a :href="restaurant.urls.pc" target="_blank" class="restaurant-link">詳細を見る</a>
          </div>
        </li>
      </ul>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import searchShops from '@/api/randamShops.js';
  
  export default {
    data() {
      return {
        restaurants: [],
        errorMessage: '',
      };
    },
    methods: {
      async getLocationAndFetchRestaurants() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await this.fetchRestaurants(latitude, longitude);
            },
            (error) => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  this.errorMessage = 'ユーザーが位置情報の取得を許可しませんでした。';
                  break;
                case error.POSITION_UNAVAILABLE:
                  this.errorMessage = '位置情報が利用できません。';
                  break;
                case error.TIMEOUT:
                  this.errorMessage = '位置情報の取得がタイムアウトしました。';
                  break;
                case error.UNKNOWN_ERROR:
                  this.errorMessage = '位置情報の取得中に不明なエラーが発生しました。';
                  break;
              }
              console.error('Geolocation error:', error);
            },
            { timeout: 10000 } // 位置情報取得のタイムアウトを10秒に設定
          );
        } else {
          this.errorMessage = 'このブラウザでは位置情報が利用できません。';
        }
      },
      async fetchRestaurants(lat, lng) {
        try {
          const restaurants = await searchShops(lat, lng);
          console.log('Fetched Restaurants:', restaurants);
          this.restaurants = restaurants;
          this.errorMessage = '';
        } catch (error) {
          console.error('Error fetching restaurants:', error);
          this.restaurants = [];
          this.errorMessage = 'レストランの取得中にエラーが発生しました。';
        }
      }
    },
    mounted() {
      console.log('Component Mounted');
      this.getLocationAndFetchRestaurants(); // コンポーネントのマウント時に自動的に位置情報を取得し、レストランを検索
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  .restaurant-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .restaurant-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
  }
  .restaurant-image {
    width: 180px;
    height: 180px;
    margin-bottom: 10px;
  }
  .restaurant-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .restaurant-name {
    font-size: 1.2em;
    margin-bottom: 5px;
  }
  .restaurant-address, .restaurant-access {
    color: #555;
  }
  .restaurant-link {
    color: #007BFF;
    text-decoration: none;
  }
  </style>
  