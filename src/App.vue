
<script>
import axios from "axios"
import AppNavBar from "./components/AppNavbar.vue"
import AppFooter from "./components/AppFooter.vue"

export default {
  components: {
    AppNavBar,
    AppFooter
  },
}

</script>

<template>
  <AppNavBar/>
  <div class="container-main">
    <router-view></router-view>
  </div>
  <AppFooter/>
</template>

<style lang="scss">
  @use "./style/general" as *;

  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
  * {
    font-family: "Quicksand", Arial, Helvetica, sans-serif;
  }

  .container-main {
    height: 100%;
    width: 100%;
    // padding-top: $header-height;
  }
</style>