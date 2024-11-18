<template>
    <div>
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
    </div>
  </template>
  
  <script>
  import searchRecipesAPI from '@/api/searchRecipes';
  
  export default {
    data() {
      return {
        selectedCategory: 'large', // カテゴリーをlargeに固定
        recipes: [],
        errorMessage: '',
      };
    },
    methods: {
      async searchRecipes() {
        try {
          const recipes = await searchRecipesAPI(this.selectedCategory);
          this.recipes = recipes;
          this.errorMessage = '';
        } catch (error) {
          this.recipes = [];
          this.errorMessage = 'レシピの取得中にエラーが発生しました。';
        }
      }
    },
    mounted() {
      this.searchRecipes();
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
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

