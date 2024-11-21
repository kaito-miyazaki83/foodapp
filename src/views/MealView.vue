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
            <MealListComponent :meals="meals" />
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
import { doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase_settings/index.js';

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
      meals: [],
      uid: "",
      inputFood: "",
    };
  },
  methods: {
    async getMeals() {
      this.meals = [];
      try {
        const docRef = doc(db, "userData", this.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.meals = docSnap.get('meals') || [];
          this.meals = this.meals.map(meal => ({
            food: meal.food,
            timestamp: meal.timestamp.toDate().toLocaleString(),
          }));
        } else {
          this.meals = [{ food: "データ未登録", timestamp: "" }];
        }
      } catch (error) {
        this.meals = [{ food: "データ取得に失敗しました", timestamp: "" }];
        console.log(error);
      }
    },
    async registerFood() {
      if (this.isLoading) { return; }
      const mFood = this.inputFood.trim();
      if (mFood === "") {
        this.errorMessage = "食べたご飯が入力されていません";
        return;
      }
      this.errorMessage = "";
      const result = confirm('食べたご飯を登録しますか？');
      if (!result) { return; }
      this.isLoading = true;
      const docRef = doc(db, "userData", this.uid);
      try {
        const newMeal = {
          food: mFood,
          timestamp: serverTimestamp(),
        };
        await updateDoc(docRef, {
          meals: arrayUnion(newMeal)
        });
      } catch (error) {
        console.log(error);
        alert("エラーが発生しました");
      }
      this.getMeals();
      this.isLoading = false;
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.getMeals();
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
