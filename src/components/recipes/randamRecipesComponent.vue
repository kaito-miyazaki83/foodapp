<template>
    <div class="category-container">
      <div v-for="category in categories" :key="category.categoryId" class="category-item">
        <a class="category-link">{{ category.categoryName }}</a>
      </div>
    </div>
    <ul class="recipe-list">
      <li v-for="recipe in recipes" :key="recipe.recipeId" class="recipe-item">
        <img v-if="recipe.foodImageUrl" :src="recipe.foodImageUrl" alt="recipe image" class="recipe-image" />
        <div class="recipe-info">
          <a :href="recipe.recipeUrl" target="_blank" class="recipe-name">{{ recipe.recipeTitle }}</a>
          <p class="recipe-description">{{ recipe.recipeDescription }}</p>
        </div>
      </li>
    </ul>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </template>
  
  <script>
  import randamRecipes from '@/api/randamRecipes.js';
  
  export default {
    data() {
      return {
        categories: [],
        recipes: [],
        errorMessage: '',
      };
    },
    methods: {
      async fetchRecipes() {
        try {
          const recipes = await randamRecipes();
          console.log('Fetched Recipes:', recipes); // レシピデータをログ出力
          this.recipes = recipes;
          this.errorMessage = '';
        } catch (error) {
          console.error('Error fetching recipes:', error.message || error);
          this.recipes = [];
          this.errorMessage = 'レシピの取得中にエラーが発生しました。';
        }
      }
    },
    created() {
      console.log('Component Created');
    },
    mounted() {
      console.log('Component Mounted');
      this.fetchRecipes(); // ページロード時に自動的にレシピを取得
    },
    updated() {
      console.log('Component Updated');
      console.log('Current Recipes:', this.recipes);
    },
    unmounted() {
      console.log('Component Unmounted');
    },
    watch: {
      recipes(newRecipes) {
        console.log('Recipes Changed:', newRecipes);
      }
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  .category-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }
  .category-item {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  .category-item:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
  }
  .category-link {
    font-size: 1.2em; /* 文字サイズを大きく設定 */
    font-weight: bold;
    color: inherit;
    text-decoration: none;
  }
  .recipe-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .recipe-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
  }
  .recipe-image {
    width: 180px;
    height: 180px;
    margin-bottom: 10px;
  }
  .recipe-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .recipe-name {
    font-size: 1.2em;
    margin-bottom: 5px;
  }
  .recipe-description {
    color: #555;
  }
  </style>
  