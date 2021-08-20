<template>
  <div class="login">
    <b-container class="bv-example-row">
      <b-row class="justify-content-lg-center">
        <b-col>
          <b-img-lazy
            class="img-cover"
            :src="require('../assets/cover-image.jpeg')"
            alt="cover-image"
          >
          </b-img-lazy>
        </b-col>
        <b-col sm="4">
          <Auth />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Auth from "../components/Auth.vue";
export default {
  name: "Login",
  components: {
    Auth,
  },
  computed: {
    ...mapState({
      token: "token",
    }),
  },

  created() {
    const cookies = document.cookie;
    console.log(cookies);
    this.getToken();
    const accessToken = localStorage.getItem("access-token");
    if (this.token) {
      if (accessToken) {
        this.$router.push(`/home#access_token=${accessToken}`);
      } else {
        this.$router.push("/home");
      }
    }
  },
};
</script>

<style>
.signin-pill {
  font-family: "Quicksand", sans-serif;
}
.btn-login {
  width: 100%;
  background-color: rgb(18, 20, 15) !important;
  font-size: 20px !important;
  letter-spacing: 2px;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  color: rgba(0, 255, 21) !important;
  border-radius: 100px !important;
  font-family: "Quicksand", sans-serif;
  margin-top: 2%;
}

.success-msg {
  color: rgba(0, 255, 21) !important;
}

.form-login {
  margin-top: 20%;
}
.spinner-signin {
  color: rgb(56, 160, 143);
}
.tab {
  box-shadow: 0 0 7px #fff, 0 0 15px rgb(157, 255, 0);
  background-color: rgba(18, 20, 15, 0.705) !important;
  border-radius: 10px !important;
  width: 80%;
}

.check-box {
  padding: 5px;
}
.img-cover {
  margin-top: 10%;
  width: 80%;
  border-radius: 10px;
  box-shadow: 0 0 7px #fff, 0 0 30px rgb(157, 255, 0);
}
.img-cover:hover {
  box-shadow: 0 0 7px #fff, 0 0 40px rgb(157, 255, 0);
}
.tab-sigin {
  background-color: cadetblue;
  color: antiquewhite;
}
.tab-title-class {
  font-family: "Quicksand", sans-serif;
  letter-spacing: 1px;
  list-style: none;
}
.error-msg {
  color: crimson;
}
.text {
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
  font-family: "Quicksand", sans-serif;
  font-size: 25px;
}
.text-label {
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
  font-family: "Quicksand", sans-serif;
  font-size: 15px;
}

.text-input-auth {
  background-color: transparent !important;
  border: 2px solid yellowgreen !important;
  border-radius: 20px !important;
  color: #fff !important;
  text-shadow: 0 0 1px rgb(5, 34, 12), 0 0 5px rgb(228, 255, 184) !important;
  font-size: 20px !important;
}
.login {
  height: 90%;
}

::placeholder {
  color: rgb(0, 255, 21) !important;
  text-shadow: 0 0 0px rgb(5, 34, 12), 0 0 0px rgb(228, 255, 184) !important;
}
/* Medias */
@media only screen and (max-width: 1200px) {
}
/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .text {
    font-size: 18px !important ;
  }
  .text-input-auth {
    font-size: 14px !important;
  }
  .form-login {
    margin-top: 20%;
  }
  figure {
    display: none;
  }
  .logo-img {
    width: 30px;
  }
  .btn-login {
    font-size: 14px !important;
  }
  .img-cover {
    display: none;
  }
}
/*Medium Phome*/
@media only screen and (max-width: 568px) {
  .text {
    font-size: 15px !important ;
  }
  .text-input-auth {
    font-size: 10px !important;
  }

  .cover-img {
    opacity: 0;
  }
  .form-login {
    margin-top: 10%;
  }
  figure {
    display: none;
  }
  .logo-img {
    width: 30px;
  }
  .btn-login {
    font-size: 10px !important;
  }
  .img-cover {
    display: none;
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .text {
    font-size: 15px !important ;
  }
  .text-input-auth {
    font-size: 10px !important;
  }
  .tab {
    margin-left: 5%;
  }
  .cover-img {
    opacity: 0;
  }
  .form-login {
    margin-top: 10%;
  }
  figure {
    display: none;
  }
  .logo-img {
    width: 25px;
  }
  .btn-login {
    font-size: 10px !important;
  }
  .img-cover {
    display: none;
  }
}
@media (hover: hover) and (pointer: fine) {
  .btn-login:hover {
    box-shadow: 0 0 7px #fff, 0 0 30px rgb(157, 255, 0);
  }
}
</style>
