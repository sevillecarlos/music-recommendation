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
  background: rgb(20, 20, 26);
  background: -moz-linear-gradient(
    0deg,
    rgba(20, 20, 26, 1) 0%,
    rgba(37, 37, 44, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(20, 20, 26, 1) 0%,
    rgba(37, 37, 44, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(20, 20, 26, 1) 0%,
    rgba(37, 37, 44, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#14141a",endColorstr="#25252c",GradientType=1);
}
.text-footer {
  padding: 10px;
  font-size: 20px;
  font-family: "Quicksand", sans-serif;
   color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
}
</style>
