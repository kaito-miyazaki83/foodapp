<template>

  <body>
    <HeaderComponent></HeaderComponent>

    <main>
      <div class="recipe">
        <randam-recipes-component></randam-recipes-component>
      </div>
      <div class="restaurant">
        <ramdam-restaurant-component></ramdam-restaurant-component>
      </div>
      <div class="sidebar"></div>
    </main>

    <FooterComponent></FooterComponent>
  </body>
</template>

<script>
import HeaderComponent from '../components/common/HeaderComponent.vue';
import FooterComponent from '../components/common/FooterComponent.vue';
import RandamRecipesComponent from '../components/recipes/randamRecipesComponent.vue';
import RamdamRestaurantComponent from '../components/restaurants/ramdamRestaurantComponent.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    FooterComponent,
    RandamRecipesComponent,
    RamdamRestaurantComponent
  },
  data() {
    return {};
  },
  methods: {},
  mounted() { }
};
</script>

<style scoped>
/* ///////////////////////////////////////// */
/* コンテンツ関連 */
/* ///////////////////////////////////////// */

.contents {
  font-size: 30px;
  margin: 50px 0 0 0;
}
</style>
