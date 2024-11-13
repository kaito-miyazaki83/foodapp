<template>
  <v-container class="search-form">
    <v-row>
      <v-col cols="12" xs="10" sm="8" md="6" lg="4">
        <v-text-field label="店名" v-model="shopName" />
      </v-col>
      <v-col cols="2">
        <v-btn @click="loadShops" :loading="loading">検索</v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="error_msg" type="error">{{ error_msg }}</v-alert>

    <v-row v-if="shops">
      <v-col cols="12" xs="12" sm="6" md="4" lg="3" v-for="(shop, index) in shops" :key="index">
        <v-card>
          <v-img :src="shop.logo_image" />
          <v-card-title>{{ shop.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import searchShops from "../../api/searchShops";

export default {
  name: "HotpeperComponent",

  data() {
    return {
      shopName: null,
      shops: null,
      error_msg: null,
      loading: false
    };
  },

  methods: {
    loadShops() {
      this.shops = null;
      this.error_msg = null;
      this.loading = true;

      searchShops(this.shopName)
        .then(res => {
          this.shops = res;
        })
        .catch(err => {
          this.error_msg = err;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.search-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
