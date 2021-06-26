<template>
  <b-overlay
    :show="showOverlay"
    rounded="lg"
    class="overlay"
    variant="transparent"
    opacity="0.91"
    blur="1rem"
  >
    <template #overlay>
      <div class="d-flex align-items-center">
        <b-spinner small type="grow" class="small-spiner"></b-spinner>
        <b-spinner type="grow" class="big-spiner"></b-spinner>
        <b-spinner small type="grow" class="small-spiner"></b-spinner>
      </div>
    </template>
    <div class="login">
      <b-container class="bv-example-row">
        <b-row class="justify-content-md-center">
          <b-col>
            <figure>
              <img
                class="img-cover"
                src="../assets/cover-image.jpeg"
                alt="cover-image"
              />
            </figure>
          </b-col>
          <b-col sm="4"
            ><div class="form-login">
              <div>
                <b-card class="tab" no-body>
                  <b-tabs
                    pills
                    card
                    class="tabs"
                    active-nav-item-class="active-class"
                    nav-wrapper-class="control-tab"
                  >
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
                        <p class="error-msg" v-show="showErrorMsg">
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
                            placeholder="Enter Password"
                            required
                            :type="showPasswordRegister ? 'text' : 'password'"
                            v-model="confirmPassword"
                          ></b-form-input>
                          <b-form-checkbox
                            id="show-password-login2"
                            v-model="showPasswordRegister"
                            name="show-password-login2"
                            class="check-box"
                          >
                            show passwords
                          </b-form-checkbox>
                        </b-form-group>
                        <p
                          :class="successMsg ? 'success-msg' : 'error-msg'"
                          v-show="showErrorMsgRegister"
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
                  </b-tabs>
                </b-card>
              </div>
            </div></b-col
          >
        </b-row>
      </b-container>
    </div>
  </b-overlay>
</template>

<script>
export default {
  name: "Login",
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
      showErrorMsg: false,
      showErrorMsgRegister: false,
      errorMsgRegister: "",
      successMsg: "",
      success: false,
    };
  },
  created() {
    this.$store.dispatch("getToken");
    const accessToken = localStorage.getItem("access-token");

    if (this.$store.state.token) {
      if (accessToken) {
        this.$router.push(`/home#access_token=${accessToken}`);
      } else {
        this.$router.push("/home");
      }
    }
  },
  methods: {
    async submitLogin() {
      await this.$store.dispatch("signIn", this.formLogin);
      if (this.$store.state.error) {
        this.showErrorMsg = true;
        this.errorMsg = this.$store.state.error;
        this.$store.state.error = "";
      } else {
        this.showOverlay = true;
        setTimeout(() => {
          this.$store.commit("setLogOutShow", true);

          this.$router.push("home");
        }, 3000);
      }
    },
    async submitRegister() {
      await this.$store.dispatch("signUp", this.formRegister);
      if (this.$store.state.errorRegister) {
        this.errorMsgRegister = this.$store.state.errorRegister;
        this.$store.state.errorRegister = "";
      } else {
        this.success = true;
        this.successMsg = this.$store.state.successMsg;
        this.formRegister.fullName = "";
        this.formRegister.email = "";
        this.formRegister.password = "";
        this.confirmPassword = "";
      }
      this.showErrorMsgRegister = true;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap");

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
.btn-login:hover {
  box-shadow: 0 0 7px #fff, 0 0 30px rgb(157, 255, 0);
}
.success-msg {
  color: green;
}

.form-login {
  margin-top: 20%;
  margin-left: auto;
  margin-right: auto;
}
.spinner-signin {
  color: rgb(56, 160, 143);
}
.tab {
  border: 3px solid rgba(0, 128, 0, 0.418);
  box-shadow: 0 0 7px #fff, 0 0 15px rgb(157, 255, 0);
  background-color: rgba(18, 20, 15, 0.705) !important;
  border-radius: 10px !important;
}

.check-box {
  padding: 5px;
}
.img-cover {
  margin-top: 10%;
  width: 100%;
  border-radius: 10px;
  border: 3px solid rgba(0, 128, 0, 0.418);
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

.small-spiner {
  color: #d4d700;
}
.big-spiner {
  color: #dddf00;
}
.text-input-auth {
  background-color: transparent !important;
  border: 2px solid yellowgreen !important;
  border-radius: 20px !important;
  color: #fff !important;
  text-shadow: 0 0 1px rgb(5, 34, 12), 0 0 5px rgb(228, 255, 184) !important;
  font-size: 20px !important;
}
#login {
  background-color: rgba(216, 214, 209, 0.473);
  height: 90vh;
}
@media only screen and (max-width: 1200px) {
}
/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .text {
    font-size: 22px !important ;
  }
  .text-input-auth {
    font-size: 17px !important;
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
    font-size: 18px !important;
  }
}
/*Medium Phome*/
@media only screen and (max-width: 568px) {
  .text {
    font-size: 20px !important ;
  }
  .text-input-auth {
    font-size: 15px !important;
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
    font-size: 15px !important;
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .text {
    font-size: 20px !important ;
  }
  .text-input-auth {
    font-size: 15px !important;
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
    font-size: 15px !important;
  }
}
::placeholder {
  color: rgb(0, 255, 21) !important;
  text-shadow: 0 0 0px rgb(5, 34, 12), 0 0 0px rgb(228, 255, 184) !important;
}
</style>
