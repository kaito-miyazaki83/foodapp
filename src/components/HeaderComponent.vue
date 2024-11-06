<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="header_container">
    <div class="header_logo">
      <div class="img_container">
        <img src="../assets/logo.svg" alt="logo">
      </div>
      <p>Vue Firebase Example</p>
    </div>
    <div>
      <div class="login_name blue">&nbsp;{{ login_name }}</div>
      <div class="header_menu">
        <div class="menu_item" v-on:click="goToHome">Home</div>
        <div class="menu_item" v-on:click="goToFood">Food</div>
        <div class="menu_item" v-on:click="confirmLogout">Logout</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contents {
    font-size: 30px;
    margin: 50px 0 0 0;
}

.header_container {
  display: flex;
  justify-content: space-between;
  padding: 7px 25px 15px 25px;
  height: 60px;
  width: auto;
  background: #efefef;
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
</style>
