<template>
  <div class="header_container">
    <div class="header_logo">
      <div class="img_container">
        <img src="../../assets/logo.png" alt="Logo">
      </div>
      <p>FoodApp</p>
    </div>
    <div class="hamburger_menu" @click="toggleMenu">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="nav_links" :class="{ 'open': menuOpen }">
      <div class="login_name blue">&nbsp;{{ login_name }}</div>
      <div class="header_menu">
        <div class="menu_item" @click="goToHome">Home</div>
        <div class="menu_item" @click="goToMeal">食事を記録する</div>
        <div class="menu_item" @click="goToFood">ごはんメモ</div>
        <div class="menu_item" @click="goToRecipe">レシピを見る</div>
        <div class="menu_item" @click="goToRestaurant">レストランを探す</div>
        <div class="menu_item" @click="confirmLogout">Logout</div>
      </div>
    </div>
  </div>
</template>

<script>
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase_settings/index.js';

export default {
  name: 'HeaderComponent',
  data() {
    return {
      login_name: "",
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    confirmLogout() {
      const result = confirm('ログアウトしますか？');
      if (!result) { return; }
      this.logOut();
    },
    logOut() {
      signOut(auth).then(() => {
        this.$router.push('/login');
        console.log("ログアウト成功");
        alert('ログアウトしました');
      }).catch((error) => {
        console.log('ログアウトエラー: error ->' + error);
        alert('ログアウト処理でエラーが発生しました');
      });
    },
    showLoginEmail() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const email = user.email;
          this.login_name = 'ログイン中: ' + email + ' さん';
        } else {
          this.login_name = '未ログイン: ゲストユーザーさん';
        }
      });
    },
    goToHome() {
      const nowRoute = this.$route.path;
      if (nowRoute != '/') {
        this.$router.push('/');
      } else {
        window.location.reload();
      }
    },
    goToMeal() {
      const nowRoute = this.$route.path;
      if (nowRoute != '/meal') {
        this.$router.push('/meal');
      } else {
        window.location.reload();
      }
    },
    goToFood() {
      const nowRoute = this.$route.path;
      if (nowRoute != '/food') {
        this.$router.push('/food');
      } else {
        window.location.reload();
      }
    },
    goToRecipe() {
      const nowRoute = this.$route.path;
      if (nowRoute != '/recipe') {
        this.$router.push('/recipe');
      } else {
        window.location.reload();
      }
    },
    goToRestaurant() {
      const nowRoute = this.$route.path;
      if (nowRoute != '/restaurant') {
        this.$router.push('/restaurant');
      } else {
        window.location.reload();
      }
    },
  },
  mounted() {
    this.showLoginEmail();
  }
};
</script>

<style scoped>
/* ヘッダー関連のスタイル */
.header_container {
    display: flex;
    justify-content: space-between;
    padding: 7px 25px 15px 25px;
    height: 60px;
    width: auto;
    background: #efefef;
    align-items: center;
}
.header_logo {
    display: flex;
    width: fit-content;
}
.header_logo p {
    font-size: 35px;
    padding: 0 0 0 10px;
}
.img_container {
    width: 100px;
}
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.login_name {
    text-align: right;
}
.header_menu {
    display: flex;
    justify-content: right;
    padding: 2px 0 5px 0;
    margin: 0 0 0 10px;
}
.menu_item {
    width: max-content;
    margin-left: 30px;
}
.menu_item:hover {
    cursor: pointer;
    color: #2296f3;
    border-bottom: solid 3px #2296f3;
}

.hamburger_menu {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.hamburger_menu .bar {
    height: 3px;
    width: 25px;
    background-color: #333;
    margin: 4px 0;
    transition: 0.4s;
}

.nav_links {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    transition: transform 0.3s ease-in-out;
}

.nav_links.open {
    display: flex;
    flex-direction: column;
    transform: translateX(0);
}

@media (max-width: 980px) {
    .header_menu {
        display: none;
    }
    .hamburger_menu {
        display: flex;
    }
    .nav_links {
        display: none;
        position: absolute;
        top: 60px;
        left: 0;
        background: #efefef;
        width: 100%;
        height: calc(100vh - 60px);
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .nav_links.open {
        display: flex;
    }
    .menu_item {
        margin: 10px 0;
        font-size: 20px;
    }
}

</style>
