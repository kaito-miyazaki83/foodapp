<template>
    <div>
      <ul>
        <li v-for="meal in meals" :key="meal.timestamp">
          <p>{{ meal.food }} - {{ meal.timestamp }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MealListComponent',
    props: {
      meals: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* 必要に応じてスタイルを追加 */
  </style>
  