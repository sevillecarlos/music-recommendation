<template>
  <div class="app">
    <Header></Header>
    <router-view />
    <div class="footer">
      <span>code by Carlos🍒</span>
    </div>
  </div>
</template>
<script>
import Header from "@/ui/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
<style>
.app {
  height: 100%;
  width: 90%;
  margin: auto;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
  text-align: center;
  font-size: 20px;
  padding: 15px;
  font-weight: bold;
  cursor: pointer;
}
.footer:hover {
  color: #fff;
  text-shadow: 0 0 15px #fff, 0 0 8px rgb(157, 255, 0);
}
</style>
