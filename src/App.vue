<template>
  <div class="app">
    <Header></Header>
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
<style>
.app{
  height: 100%;
}
</style>
