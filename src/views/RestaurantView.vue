<template>

  <body>
      <HeaderComponent></HeaderComponent>

      <main>
          <h1>HOT PEPPPER</h1>
          <HotpeperComponent></HotpeperComponent>
      </main>

      <FooterComponent></FooterComponent>
  </body>
</template>

<script>
import HeaderComponent from '../components/common/HeaderComponent.vue'
import FooterComponent from '../components/common/FooterComponent.vue'
import HotpeperComponent from '../components/restaurants/HotpeperComponent.vue'

export default {
name: 'HomeView',
components: {
  HeaderComponent,
  FooterComponent,
  HotpeperComponent
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
