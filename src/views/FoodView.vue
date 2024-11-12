<template>
    <div>
      <HeaderComponent></HeaderComponent>
      <main>
        <!-- <p class="contents">ここがFoodです</p> -->
        <div class="all_container">
          <div class="row_container">
            <div class="container_left">
              <p>好きな食べ物</p>
            </div>
            <div class="container_right">
              <p>{{ food }}</p>
              <p>{{ timestamp }}</p>
            </div>
          </div>
          <div class="row_container">
            <div class="container_left"></div>
            <div class="container_right">
              <input type="text" v-model="inputFood">
            </div>
          </div>
          <div class="row_container">
            <div class="container_left"></div>
            <div class="container_right">
              <button class="btn_standard" v-on:click="registerFood">好きな食べ物を登録</button>
              <p class="red">{{ errorMessage }}&nbsp;</p>
              <!-- ローディングアニメーション -->
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
  import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth, db } from '../firebase_settings/index.js';  // Ensure correct import
  
  export default {
    name: 'FoodView',
    components: {
      HeaderComponent,
      FooterComponent,
      LoadingAnimationComponent,
    },
    data() {
      return {
        errorMessage: "",
        isLoading: false,
        food: "",
        uid: "",
        inputFood: "",
        timestamp: "",
      };
    },
    methods: {
      async getFavoriteFood() {
        this.food = "";
        try {
          const docRef = doc(db, "userData", this.uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            this.food = "データ未登録";
            this.timestamp = "";
            return;
          }
          this.food = docSnap.get('food');
          this.timestamp = "更新日時: " + docSnap.get('timestamp').toDate().toLocaleString();
        } catch (error) {
          this.food = "データ取得に失敗しました";
          console.log(error);
        }
      },
      async registerFood() {
        if (this.isLoading) { return; }
        const mFood = this.inputFood.trim();
        if (mFood === "") {
          this.errorMessage = "好きな食べ物が入力されていません";
          return;
        }
        this.errorMessage = "";
        const result = confirm('好きな食べ物を登録しますか？');
        if (!result) { return; }
        this.isLoading = true;
        const docRef = doc(db, "userData", this.uid);
        try {
          await setDoc(docRef, {
            food: mFood,
            timestamp: serverTimestamp(),
          }, { merge: true });
        } catch (error) {
          console.log(error);
          alert("エラーが発生しました");
        }
        this.getFavoriteFood();
        this.isLoading = false;
      }
    },
    mounted() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.uid = user.uid;
          this.getFavoriteFood();
        } else {
          this.uid = "";
        }
      });
    }
  };
  </script>
  
  <style scoped>
  /* コンテンツ関連 */
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
  