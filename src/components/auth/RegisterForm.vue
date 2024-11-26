<template>
  <div class="register-form">
    <h2>新規登録</h2>
    <form @submit.prevent="register">
      <div class="container">
        <p>ID(メールアドレス)</p>
        <input type="email" v-model="email" required>
      </div>
      <div class="container">
        <p>パスワード</p>
        <input type="password" v-model="password" required>
      </div>
      <div class="message">
        <p class="red">{{ errorMessage }}&nbsp;</p>
      </div>
      <button class="btn_standard" type="submit">登録</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { auth } from '../../firebase_settings/index.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'RegisterComponent',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        // 登録成功後の処理
        this.$emit('register-success');
      } catch (error) {
        this.error = error.message;
      }
    }
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
