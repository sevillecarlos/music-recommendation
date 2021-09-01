<template>
  <div class="login">
    <b-container class="bv-example-row">
      <b-row class="justify-content-lg-center">
        <b-col>
          <div class="login-image-container">
            <b-img-lazy
              class="img-cover"
              :src="require('../assets/login-image-cover.gif')"
              alt="cover-image"
            >
            </b-img-lazy>
            <h5>
              Music
            </h5>
            <h5>Recommendation</h5>
          </div>
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
  created() {},
  watch: {
    token() {
      if (this.token) {
        this.$router.push("home");
      }
    },
  },
};
</script>

<style>


.login-image-container {
  margin-top: 10%;
  padding: 1px;
}
.login-image-container h5 {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
  font-size: 90px;
}
.img-cover {
  width: 25%;
  border-radius: 10px;
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

</style>
