<template>
  <div>
    <header>
      <div class="title">Food List App</div>
    </header>
    <main>
      <div class="tabs">
        <button :class="{ active: isLoginTab }" @click="isLoginTab = true">ログイン</button>
        <button :class="{ active: !isLoginTab }" @click="isLoginTab = false">新規登録</button>
      </div>
      <div v-if="isLoginTab">
        <LoginComponent @login-success="handleLoginSuccess" />
      </div>
      <div v-else>
        <RegisterComponent @register-success="handleRegisterSuccess" />
      </div>
    </main>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import FooterComponent from '../components/common/FooterComponent.vue';
import LoginComponent from '../components/auth/LoginForm.vue';
import RegisterComponent from '../components/auth/RegisterForm.vue';

export default {
  name: 'LoginRegisterView',
  components: {
    FooterComponent,
    LoginComponent,
    RegisterComponent
  },
  data() {
    return {
      isLoginTab: true,
    };
  },
  methods: {
    handleLoginSuccess() {
      this.$router.push('/');
    },
    handleRegisterSuccess() {
      this.isLoginTab = true;
    }
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

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  background: #ddd;
  cursor: pointer;
}

.tabs button.active {
  background: #333;
  color: #fff;
}
</style>
