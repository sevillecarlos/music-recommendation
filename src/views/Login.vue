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
        <b-col sm="4"
          ><div class="form-login">
            <div>
              <b-card class="tab" no-body>
                <Overlay :showOverlay="showOverlay">
                  <Tabs class="tabs" :card="true">
                    <b-tab class="signin-pill" title-link-class="title-tab">
                      <template #title class="tab-sigin">
                        Sign In
                      </template>
                      <p class="text">
                        <img
                          class="logo-img"
                          src="../assets/logo.png"
                          alt="Logo"
                        />
                        Login
                      </p>
                      <b-form @submit.prevent="submitLogin">
                        <b-form-group
                          id="input-group-1"
                          label="Email address:"
                          class="text-label"
                          label-for="input-1"
                        >
                          <b-form-input
                            id="input-1"
                            class="text-input-auth"
                            type="email"
                            placeholder="Enter email"
                            required
                            v-model="formLogin.email"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group
                          id="input-group-2"
                          class="text-label"
                          label="Your Password:"
                          label-for="input-2"
                        >
                          <b-form-input
                            id="input-2"
                            class="text-input-auth"
                            placeholder="Enter Password"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="formLogin.password"
                            required212F45
                          ></b-form-input>
                          <b-form-checkbox
                            id="show-password-login"
                            v-model="showPassword"
                            name="show-password-login"
                            class="check-box"
                          >
                            show password
                          </b-form-checkbox>
                        </b-form-group>
                        <p class="error-msg" v-show="errorMsg.length !== 0">
                          {{ errorMsg }}
                        </p>
                        <b-button
                          type="submit"
                          class="btn-login"
                          variant="success"
                          >Log In</b-button
                        >
                      </b-form>
                    </b-tab>
                    <b-tab
                      class="signin-pill"
                      title="Sign Up"
                      title-link-class="title-tab"
                    >
                      <p class="text">
                        <img
                          class="logo-img"
                          src="../assets/logo.png"
                          alt="Logo"
                        />
                        Register
                      </p>
                      <b-form @submit.prevent="submitRegister">
                        <b-form-group
                          id="input-group-1"
                          class="text-label"
                          label="Fullname:"
                          label-for="input-1"
                        >
                          <b-form-input
                            signOut
                            id="input-1"
                            class="text-input-auth"
                            type="text"
                            placeholder="Enter name"
                            required
                            v-model="formRegister.fullName"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group
                          id="input-group-2"
                          class="text-label"
                          label="Email address:"
                          label-for="input-1"
                        >
                          <b-form-input
                            id="input-2"
                            class="text-input-auth"
                            type="email"
                            placeholder="Enter email"
                            required
                            v-model="formRegister.email"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group
                          class="text-label"
                          id="input-group-3"
                          label="Your Password:"
                          label-for="input-3"
                        >
                          <b-form-input
                            id="input-3"
                            class="text-input-auth"
                            placeholder="Enter Password"
                            required
                            :type="showPasswordRegister ? 'text' : 'password'"
                            v-model="formRegister.password"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group
                          id="input-group-4"
                          class="text-label"
                          label="Confirm Password:"
                          label-for="input-4"
                        >
                          <b-form-input
                            id="input-4"
                            class="text-input-auth"
                            placeholder="Enter Confirm Password"
                            required
                            :type="showPasswordRegister ? 'text' : 'password'"
                            v-model="confirmPassword"
                          ></b-form-input>
                          <b-form-checkbox
                            id="show-password-login2"
                            button-variant="outline-success"
                            v-model="showPasswordRegister"
                            name="show-password-login2"
                            class="check-box"
                          >
                            show passwords
                          </b-form-checkbox>
                        </b-form-group>
                        <p
                          :class="successMsg ? 'success-msg' : 'error-msg'"
                          v-show="errorMsgRegister.length !== 0"
                          class="register-msg"
                        >
                          {{ success ? successMsg : errorMsgRegister }}
                        </p>
                        <b-button
                          type="submit"
                          variant="success"
                          class="btn-login"
                          >Register</b-button
                        >
                      </b-form></b-tab
                    >
                  </Tabs>
                </Overlay>
              </b-card>
            </div>
          </div></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Tabs from "../components/Tabs.vue";
import { mapState, mapActions } from "vuex";
import Overlay from "../components/Overlay.vue";
export default {
  name: "Login",
  components: {
    Tabs,
    Overlay,
  },
  computed: {
    ...mapState({
      token: "token",
      error: "error",
      successMsgT: "successMsg",
      errorRegister: "errorRegister",
    }),
  },
  data: function() {
    return {
      formLogin: {
        email: "",
        password: "",
      },
      formRegister: {
        fullName: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      showPassword: false,
      showPasswordRegister: false,
      showOverlay: false,
      errorMsg: "",
      errorMsgRegister: "",
      successMsg: "",
      success: false,
    };
  },
  created() {
    const cookies = document.cookie
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

  methods: {
    ...mapActions({
      signIn: "signIn",
      signUp: "signUp",
      getToken: "getToken",
    }),

    async submitLogin() {
      await this.signIn(this.formLogin);
      if (this.error.length) {
        this.errorMsg = this.error;
        this.$store.commit("setError", "");
      } else {
        this.showOverlay = true;
        setTimeout(() => {
          this.$store.commit("setLogOutShow", true);
          this.$router.push("home");
        }, 3000);
      }
    },

    async submitRegister() {
      const { password } = this.formRegister;
      if (password !== this.confirmPassword) {
        this.errorMsgRegister = "Passwords don't match";
      } else {
        await this.signUp(this.formRegister);
        if (this.errorRegister) {
          this.errorMsgRegister = this.errorRegister;
          this.$store.commit("setErrorRegister", "");
        } else {
          this.success = true;
          this.successMsg = this.successMsgT;
          this.formRegister.fullName = "";
          this.formRegister.email = "";
          this.formRegister.password = "";
          this.confirmPassword = "";
        }
      }
    },
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
