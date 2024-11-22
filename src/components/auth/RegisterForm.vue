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
.register-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
