<template>
  <div>
    <select v-model="selectedCategory" @change="searchRecipes">
      <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
        {{ category.categoryName }}
      </option>
    </select>
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
import fetchCategories from '@/api/fetchCategories';
import searchRecipesAPI from '@/api/searchRecipes';

export default {
  data() {
    return {
      categories: [],
      selectedCategory: '', // 初期値は空
      recipes: [],
      errorMessage: '',
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const categories = await fetchCategories();
        console.log('Fetched Categories:', categories); // カテゴリデータをログ出力
        this.categories = categories;
        if (this.categories.length > 0) {
          this.selectedCategory = this.categories[0].categoryId;
          this.searchRecipes();
        }
        this.errorMessage = '';
      } catch (error) {
        console.error(error); // エラー内容をログ出力
        this.errorMessage = 'カテゴリの取得中にエラーが発生しました。';
      }
    },
    async searchRecipes() {
      if (!this.selectedCategory) return;
      try {
        const recipes = await searchRecipesAPI(this.selectedCategory);
        console.log('Fetched Recipes:', recipes); // レシピデータをログ出力
        this.recipes = recipes;
        this.errorMessage = '';
      } catch (error) {
        console.error(error); // エラー内容をログ出力
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
    this.fetchCategories();
  },
  updated() {
    console.log('Component Updated');
    console.log('Current Categories:', this.categories);
    console.log('Current Selected Category:', this.selectedCategory);
    console.log('Current Recipes:', this.recipes);
  },
  unmounted() { // `destroyed` の代わりに `unmounted` を使用します
    console.log('Component Unmounted');
  },
  watch: {
    categories(newCategories) {
      console.log('Categories Changed:', newCategories);
    },
    selectedCategory(newCategory) {
      console.log('Selected Category Changed:', newCategory);
    },
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
