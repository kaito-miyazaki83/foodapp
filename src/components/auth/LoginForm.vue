<template>
    <div>
      <div class="container">
        <p>ID(メールアドレス)</p>
        <input type="email" v-model="inputValueId">
        <p></p>
      </div>
      <div class="container">
        <p>パスワード</p>
        <input type="password" v-model="inputValuePassword">
        <p></p>
      </div>
      <div class="message">
        <p class="red">{{ errorMessage }}&nbsp;</p>
      </div>
      <div>
        <button class="btn_standard" type="submit" @click="logIn">ログインする</button>
      </div>
      <div class="loading_animation_container">
        <div class="loading_animation" v-if="isLoading">
          <LoadingAnimationComponent></LoadingAnimationComponent>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoadingAnimationComponent from '../common/LoadingAnimationComponent.vue';
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from '../../firebase_settings/index.js';
  
  export default {
    name: 'LoginComponent',
    components: {
      LoadingAnimationComponent,
    },
    data() {
      return {
        isLoading: false,
        errorMessage: '',
        inputValueId: '',
        inputValuePassword: '',
      };
    },
    methods: {
      logIn() {
        if (this.inputValueId === '' || this.inputValuePassword === '') {
          this.errorMessage = 'IDまたはパスワードが未入力です';
          return;
        }
        this.errorMessage = '';
        this.isLoading = true;
        const mId = this.inputValueId;
        const mPass = this.inputValuePassword;
        this.inputValuePassword = '';
        signInWithEmailAndPassword(auth, mId, mPass)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("ログイン成功 " + user.email);
            this.$emit('login-success');
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
  .loading_animation_container {
    height: 15px;
    margin-top: 10px;
  }
  </style>
  