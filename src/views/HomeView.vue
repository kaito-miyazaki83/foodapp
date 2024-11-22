<template>
  <div>
    <HeaderComponent></HeaderComponent>

    <main class="main-container">
      <div class="content">
        <div class="recipe">
          <RandamRecipesComponent></RandamRecipesComponent>
        </div>
        <div class="restaurant">
          <RamdamRestaurantComponent></RamdamRestaurantComponent>
        </div>
      </div>
      <aside class="sidebar">
        <MealListComponent />
      </aside>
    </main>

    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from '../components/common/HeaderComponent.vue';
import FooterComponent from '../components/common/FooterComponent.vue';
import RandamRecipesComponent from '../components/recipes/randamRecipesComponent.vue';
import RamdamRestaurantComponent from '../components/restaurants/ramdamRestaurantComponent.vue';
import MealListComponent from '../components/meals/MealListComponent.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    FooterComponent,
    RandamRecipesComponent,
    RamdamRestaurantComponent,
    MealListComponent
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}

.sidebar {
  width: 300px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}
</style>
