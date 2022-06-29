<template>
  <div class="app-main" style="height:100%;width:100%">
      <Navbar/>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <Alert :err="getAlert"/>

  </div>
    
</template>

<script>
import Alert from "@/generic-components/alert/Alert.vue"
import Navbar from "@/components/Navbar.vue"
import {mapGetters} from "vuex"
export default {
  components:{
    Alert,
    Navbar
  },
  computed:{
    ...mapGetters([
      "getAlert"
    ])
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
@import "@/scss/mixins.scss";
@import "@/scss/transition.scss";
.app-main{
  height: 100%;
  width: 100%;
  overflow: auto;
  gap: 70px;
}
html,body{
  font-family: 'Source Sans Pro', sans-serif;
  width:100%;
  height: 100%;
  font-size: 10px;
  @media (min-width: 1025px) and (max-width: 1440px){
    font-size: 9px;
  }
  @media (min-width: 769px) and (max-width: 1024px){
    font-size: 8px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 7px;
  }
  @media (max-width: 480px) {
    font-size: 6px;
  }
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
</style>