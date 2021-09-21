<template>
  <div class="login">
    <b-container class="login-container">
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
          <Auth class="auth-tabs" />
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
.login-container {
  margin-top: 5%;
  padding: 5%;
}
.login-image-container h5 {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
  font-size: 5vw;
}
.img-cover {
  width: 25%;
}

::placeholder {
  color: rgb(0, 255, 21) !important;
  text-shadow: 0 0 0px rgb(5, 34, 12), 0 0 0px rgb(228, 255, 184) !important;
}

/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .auth-tabs {
    margin: 10% auto;
  }
  .login-image-container {
    display: none;
  }
}
/*Medium Phome*/
@media only screen and (max-width: 568px) {
  .auth-tabs {
    margin: 10% auto;
  }
  .login-image-container {
    display: none;
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .login {
    margin-top: 1%;
  }
  .auth-tabs {
    margin: 10% auto;
  }
  .login-image-container {
    display: none;
  }
}
</style>
