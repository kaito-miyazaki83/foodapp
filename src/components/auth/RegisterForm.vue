<!-- 新規登録　後ほどログイン画面に接続予定 -->
<template>
    <div class="register-form">
      <h2>新規登録</h2>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">登録</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    name: 'RegisterForm',
    data() {
      return {
        email: '',
        password: '',
        error: ''
      };
    },
    methods: {
      async register() {
        const auth = getAuth();
        try {
          await createUserWithEmailAndPassword(auth, this.email, this.password);
          // 登録成功後の処理
          this.$router.push('/login');
        } catch (error) {
          this.error = error.message;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  </style>
  
<!-- 新規登録 -->
  