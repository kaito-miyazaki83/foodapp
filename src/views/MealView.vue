<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <main>
      <div class="all_container">
        <div class="row_container">
          <div class="container_left">
            <p>食べたご飯</p>
          </div>
          <div class="container_right">
            <MealListComponent ref="mealListComponent" />
          </div>
        </div>
        <div class="row_container">
          <div class="container_left"></div>
          <div class="container_right">
            <input type="text" v-model="inputFood" placeholder="食べたご飯を入力">
          </div>
        </div>
        <div class="row_container">
          <div class="container_left"></div>
          <div class="container_right">
            <button class="btn_standard" v-on:click="registerFood">食べたご飯を登録</button>
            <p class="red">{{ errorMessage }}&nbsp;</p>
            <div class="loading_animation" v-if="isLoading">
              <LoadingAnimationComponent></LoadingAnimationComponent>
            </div>
          </div>
        </div>
      </div>
    </main>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from '../components/common/HeaderComponent.vue';
import FooterComponent from '../components/common/FooterComponent.vue';
import LoadingAnimationComponent from '../components/common/LoadingAnimationComponent.vue';
import MealListComponent from '../components/meals/MealListComponent.vue';
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { auth, db } from '../firebase_settings/index.js';
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: 'MealView',
  components: {
    HeaderComponent,
    FooterComponent,
    LoadingAnimationComponent,
    MealListComponent,
  },
  data() {
    return {
      errorMessage: "",
      isLoading: false,
      inputFood: "",
    };
  },
  methods: {
    async registerFood() {
      if (this.isLoading) { return; }
      const mFood = this.inputFood.trim();
      if (mFood === "") {
        this.errorMessage = "食べたご飯が入力されていません";
        return;
      }
      this.errorMessage = "";
      this.isLoading = true;
      const user = auth.currentUser;
      const docRef = doc(db, "userData", user.uid);
      try {
        // タイムスタンプを先に取得
        const timestamp = Timestamp.now();
        const newMeal = {
          food: mFood,
          timestamp: timestamp,
        };
        await updateDoc(docRef, {
          meals: arrayUnion(newMeal)
        });
        // MealListComponent 内でデータを再取得して更新
        this.$refs.mealListComponent.fetchMeals();
      } catch (error) {
        console.log(error);
        alert("エラーが発生しました");
      }
      this.isLoading = false;
    }
  },
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        this.uid = "";
      }
    });
  }
};
</script>

<style scoped>
.all_container {
  margin: 50px 0 0 0;
}
.row_container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.container_left {
  width: 200px;
}
.container_right {
  width: 400px;
}
input {
  width: 300px;
}
.loading_animation {
  justify-content: left;
}
</style>
