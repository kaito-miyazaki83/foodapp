<script setup>
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <header>
    <HeaderComponent></HeaderComponent>
  </header>
    <main>
        <p class="contents">ここがHomeです</p>
        <button @click="count++">You clicked me {{ count }} times.</button>
    </main>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>





<style scoped>
body {
    min-height: calc(100vh - 40px);
    position: relative;
    box-sizing: border-box;
}

.contents {
    font-size: 30px;
    margin: 50px 0 0 0;
}

/* ///////////////////////////////////////// */
/*　後でApp.vueへ移す設定 */
/* ///////////////////////////////////////// */
/* 青色の文字(ログインネームなど) */
.blue {
    color: #2296f3;
}

header {
    background: #efefef;
    width: auto;
}

footer {
    background: #efefef;
    width: 100%;
    position: absolute;
    bottom: -40px;
    height: 40px;
}

body {
    min-height: calc(100vh - 40px);
    position: relative;
    box-sizing: border-box;
}
</style>
