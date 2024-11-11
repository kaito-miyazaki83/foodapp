<template>
    <div>
      <header>
        <div class="title">Food List App</div>
      </header>
      <main>
        <div class="container">
          <p>ID(メールアドレス)</p>
          <input type="email" v-model="inputValueId">
          <!-- この下の<p></p>はテキストボックスを中央に配置するために必要な疑似要素です -->
          <p></p>
        </div>
        <div class="container">
          <p>パスワード</p>
          <input type="password" v-model="inputValuePassword">
          <!-- この下の<p></p>はテキストボックスを中央に配置するために必要な疑似要素です -->
          <p></p>
        </div>
        <div class="message">
          <p class="red">{{ errorMessage }}&nbsp;</p>
        </div>
        <div>
          <button class="btn_standard" type="submit" v-on:click="logIn">ログインする</button>
        </div>
        <!-- ローディングアニメーション -->
        <div class="loading_animation_container">
          <div class="loading_animation" v-if="this.isLoading">
            <LoadingAnimationComponent></LoadingAnimationComponent>
          </div>
        </div>
        <div class="login_info_container">
          <div class="login_info">
            <p>LoginIDとパスワードは以下の通りです</p>
            <br>
            <p>ID: hoge_taro_9999@gmail.com</p>
            <p>Pass: hoge_taro_9999</p>
            <br>
            <p>ID: hoge_hanako_9999@gmail.com</p>
            <p>Pass: hoge_hanako_9999</p>
          </div>
        </div>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  </template>
  
  <script>
  import FooterComponent from '../components/common/FooterComponent.vue'
  import LoadingAnimationComponent from '../components/common/LoadingAnimationComponent.vue'
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from '../firebase_settings/index.js';

  export default {
    name: 'LoginView',
    components: {
      FooterComponent,
      LoadingAnimationComponent,
    },
    data() {
      return {
        isLoading: false,
        errorMessage: '',
        inputValueId: "",
        inputValuePassword: "",
      };
    },
    methods: {
      goToHome() {
        this.$router.push('/');
      },
      logIn() {
        if (this.inputValueId === "" || this.inputValuePassword === "") {
          this.errorMessage = 'IDまたはパスワードが未入力です';
          return;
        }
        this.errorMessage = "";
        this.isLoading = true;
        const mId = this.inputValueId;
        const mPass = this.inputValuePassword;
        this.inputValuePassword = "";
        signInWithEmailAndPassword(auth, mId, mPass)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("ログイン成功 " + user.email);
            this.goToHome();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('ログインエラー: errorCode -> ' + errorCode + ', errorMessage -> ' + errorMessage);
            this.JudgeErrorCode(errorCode);
            this.isLoading = false;
          });
      },
      JudgeErrorCode(mError) {
        const errorCode = String(mError);
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
          this.errorMessage = "ログインに失敗しました。IDまたはパスワードが間違っています";
        } else {
          this.errorMessage = "ログインに失敗しました。予期せぬエラーが発生しました。";
        }
      },
    }
  };
  </script>
  
  <style scoped>
  header {
      height: 120px;
  }
  header .title {
      font-size: 40px;
      padding: 20px 0 0;
  }
  main {
      padding: 30px auto;
  }
  .container {
      display: flex;
      justify-content: center;
      margin: 30px 0 0;
  }
  .container input {
      width: 400px;
  }
  .container p {
      width: 200px;
      text-align: left;
      margin-top: 8px;
  }
  .login_info_container {
      display: flex;
      justify-content: center;
      margin-top: 10px;
  }
  .login_info {
      text-align: left;
      background-color: #efefef;
      padding: 20px 100px;
      border-radius: 20px;
  }
  .loading_animation_container {
      height: 15px;
      margin-top: 10px;
  }
  </style>
  