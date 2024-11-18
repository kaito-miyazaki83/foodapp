<template>

  <body>
      <HeaderComponent></HeaderComponent>

      <main>
          <h1>楽天レシピ</h1>
          <RalutenrecipeComponent></RalutenrecipeComponent>
      </main>

      <FooterComponent></FooterComponent>
  </body>
</template>

<script>
import HeaderComponent from '../components/common/HeaderComponent.vue'
import FooterComponent from '../components/common/FooterComponent.vue'
import RalutenrecipeComponent from '../components/recipes/RakutenrecipeComponent.vue'

export default {
name: 'HomeView',
components: {
  HeaderComponent,
  FooterComponent,
  RalutenrecipeComponent
},
data() {
  return {};
},
methods: {},
mounted() {}
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
