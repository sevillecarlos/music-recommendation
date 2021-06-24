<template>
  <div class="footer"><p class="text-footer">by Carlos 🍒</p></div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap");
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
  background-image: url("../assets/background.jpg");
  background-size: cover;
  background-position: center;
  background-color: #cccccc;
}
.footer p:hover {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 30px rgb(157, 255, 0);
}
.text-footer {
  padding: 10px;
  font-size: 20px;
  font-family: "Quicksand", sans-serif;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
}
</style>
