<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
    <div class="copyright">©2024 Vue Firebase Example, Ltd. All rights reserved.</div>
</template>

<style scoped>
.contents {
    font-size: 30px;
    margin: 50px 0 0 0;
}


footer .copyright {
    font-size: 11px;
    margin: 12px auto 0 auto;
}

</style>
