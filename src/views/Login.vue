<template>
  <div class="login">
    <b-overlay
      :show="showOverlay"
      rounded="sm"
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
                  <b-tabs pills card class="tabs">
                    <b-tab
                      class="signin-pill"
                      active
                      :title-item-class="'tab-title-class'"
                    >
                      <template #title class="tab-sigin">
                        <b-spinner
                          class="spinner-signin"
                          type="grow"
                          small
                        ></b-spinner
                        >Sign In
                      </template>
                      <p>
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
                          label-for="input-1"
                        >
                          <b-form-input
                            id="input-1"
                            type="email"
                            placeholder="Enter email"
                            required
                            v-model="formLogin.email"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group
                          id="input-group-2"
                          label="Your Password:"
                          label-for="input-2"
                        >
                          <b-form-input
                            id="input-2"
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
                      :title-item-class="'tab-title-class'"
                    >
                      <p>
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
                          label="Fullname:"
                          label-for="input-1"
                        >
                          <b-form-input
                            signOut
                            id="input-1"
                            type="text"
                            placeholder="Enter name"
                            required
                            v-model="formRegister.fullName"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group
                          id="input-group-1"
                          label="Email address:"
                          label-for="input-1"
                        >
                          <b-form-input
                            id="input-1"
                            type="email"
                            placeholder="Enter email"
                            required
                            v-model="formRegister.email"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group
                          id="input-group-2"
                          label="Your Password:"
                          label-for="input-2"
                        >
                          <b-form-input
                            id="input-2"
                            placeholder="Enter Password"
                            required
                            :type="showPasswordRegister ? 'text' : 'password'"
                            v-model="formRegister.password"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group
                          id="input-group-2"
                          label="Confirm Password:"
                          label-for="input-2"
                        >
                          <b-form-input
                            id="input-2"
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
    </b-overlay>
  </div>
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
.login {
  background-color: #25252c;
  height: 90vh;
}
.btn-login {
  margin-top: 20px;
  width: 100%;
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11);
}
.tab.active {
  background-color: blueviolet;
}
.check-box {
  padding: 5px;
}
.img-cover {
  margin-top: 10%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11);
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
.overlay {
  height: 85vh;
}
.small-spiner {
  color: #d4d700;
}
.big-spiner {
  color: #dddf00;
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
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
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
}
</style>
