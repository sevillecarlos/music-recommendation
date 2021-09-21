<template>
  <div class="app">
    <div class="ribbon">
      <a
        href="https://github.com/sevillecarlos/music-recommendation"
        target="_blank"
      >
        @sevillecarlos🍒
      </a>
    </div>
    <Header />
    <router-view />
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
  width: 75%;
  margin: auto;
}
input {
  background-color: transparent !important;
  border: 2px solid yellowgreen !important;
  border-radius: 20px !important;
  box-shadow: 0 0 4px #fff, 0 0 1px rgb(157, 255, 0);
  color: #fff !important;
  text-shadow: 0 0 1px rgb(5, 34, 12), 0 0 5px rgb(228, 255, 184) !important;
  font-size: 0.9vw !important;
}
input:focus {
  outline: none !important;
  box-shadow: 0 0 10px #ffffff !important;
}
button {
  background-color: rgb(18, 20, 15) !important;
  letter-spacing: 2px;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  color: rgba(0, 255, 21) !important;
  border-radius: 100px !important;
  font-size: 1.1vw !important;
}
button[type="submit"] {
  width: 100%;
}
button:focus {
  outline: none !important;
  box-shadow: 0 0 10px #ffffff !important;
}

::placeholder {
  color: rgb(0, 255, 21) !important;
  text-shadow: 0 0 0px rgb(5, 34, 12), 0 0 0px rgb(228, 255, 184) !important;
  letter-spacing: 2px;
}
.ribbon {
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  left: -50px;
  top: 40px;

  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
}
.ribbon a {
  border: 1px solid rgb(157, 255, 0);
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
  display: block;
  font: bold 100% "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 1px 0;
  padding: 10px 50px;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 0 3px #444;
}
.ribbon a:hover {
  color: rgb(255, 255, 255);
}
/******************************************************* */
@media only screen and (max-width: 1035px) {
  .app {
    width: 100%;
  }
  input {
    font-size: 1.5vw !important;
  }
  button {
    font-size: 2vw !important;
  }
 
}
/*Medium Phome*/
@media only screen and (max-width: 767px) {
  .app {
    width: 100%;
  }
  input {
    font-size: 3vw !important;
  }
  button {
    font-size: 3vw !important;
  }
    .ribbon {
    left: -40px;
    top: 15px;
    -webkit-transform: rotate(-40deg);
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
    transform: rotate(-40deg);
  }
  .ribbon a {
    font: bold 100% "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10px;
    margin: 2px 0;
    padding: 5px 30px;
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .app {
    width: 100%;
  }
  input {
    font-size: 4vw !important;
  }
  button {
    font-size: 4vw !important;
    text-align: center;
  }
  .ribbon {
    left: -40px;
    top: 15px;
    -webkit-transform: rotate(-40deg);
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
    transform: rotate(-40deg);
  }
  .ribbon a {
    font: bold 100% "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10px;
    margin: 2px 0;
    padding: 5px 30px;
  }
}


</style>
