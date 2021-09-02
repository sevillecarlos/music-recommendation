<template>
  <div class="form-login">
    <div>
      <b-card class="tab" no-body>
        <Overlay :showOverlay="showOverlay">
          <Tabs class="tabs" :card="true">
            <b-tab class="signin-pill" title-link-class="title-tab">
              <template #title class="tab-sigin">
                Sign In
              </template>
              <p class="text">
                Login
              </p>
              <b-form @submit.prevent="submitLogin" autocomplete="off">
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
                    required
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
                <b-button type="submit" class="btn-auth">Log In</b-button>
              </b-form>
            </b-tab>
            <b-tab
              class="signin-pill"
              title="Sign Up"
              title-link-class="title-tab"
            >
              <p class="text">
                Register
              </p>
              <b-form @submit.prevent="submitRegister" autocomplete="off">
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
                <b-button type="submit" class="btn-auth">Register</b-button>
              </b-form></b-tab
            >
          </Tabs>
        </Overlay>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Overlay from "../ui/Overlay.vue";
import Tabs from "../ui/Tabs.vue";
export default {
  name: "Auth",
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
  methods: {
    ...mapActions({
      signIn: "signIn",
      signUp: "signUp",
      getToken: "getToken",
    }),

    async submitLogin() {
      this.showOverlay = true;
      await this.signIn(this.formLogin);

      if (this.token) {
        this.$store.commit("setLogOutShow", true);
      } else {
        this.showOverlay = false;
        this.errorMsg = this.error;
        this.$store.commit("setError", "");
      }
    },

    async submitRegister() {
      const { password } = this.formRegister;
      if (password !== this.confirmPassword) {
        this.errorMsgRegister = "Passwords don't match";
      } else {
        this.showOverlay = true;
        await this.signUp(this.formRegister);
        if (this.token) {
          this.$store.commit("setLogOutShow", true);
        } else {
          this.showOverlay = false;
          this.errorMsgRegister = this.errorRegister;
          this.$store.commit("setErrorRegister", "");
        }
      }
    },
  },
};
</script>

<style>
.btn-auth {
  width: 100%;
  background-color: rgb(18, 20, 15) !important;
  font-size: 20px !important;
  letter-spacing: 2px;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  color: rgba(0, 255, 21) !important;
  border-radius: 100px !important;
  margin-top: 2%;
}

.success-msg {
  color: rgba(0, 255, 21) !important;
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

.tab-sigin {
  color: antiquewhite;
}
.tab-title-class {
  letter-spacing: 1px;
  list-style: none;
}
.error-msg {
  color: crimson;
  text-shadow: 0 0 7px rgb(216, 9, 9), 0 0 10px rgb(204, 23, 23);
}
.text {
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
  font-size: 25px;
}
.text-label {
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
  font-size: 15px;
}

.text-input-auth {
  background-color: transparent !important;
  border: 2px solid yellowgreen !important;
  border-radius: 20px !important;
  box-shadow: 0 0 4px #fff, 0 0 1px rgb(157, 255, 0);
  color: #fff !important;
  text-shadow: 0 0 1px rgb(5, 34, 12), 0 0 5px rgb(228, 255, 184) !important;
  font-size: 15px !important;
}
.text-input-auth:focus {
  outline: none !important;
}
.login {
  height: 90%;
}

@media (hover: hover) and (pointer: fine) {
  .btn-auth:hover {
    background-color: black !important;
  }
}

/* Medias */
@media only screen and (max-width: 1200px) {
}
/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
  .btn-auth {
    font-size: 20px !important;
  }
  .form-login {
    margin-top: 20%;
  }
  .tab {
    width: 100% !important;
  }
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .btn-auth {
    font-size: 20px !important;
  }
  .form-login {
    margin-top: 20%;
  }
  .tab {
    width: 100% !important;
  }
}

/*Medium Phome*/
@media only screen and (max-width: 568px) {
  .btn-auth {
    font-size: 20px !important;
  }
  .form-login {
    margin-top: 20%;
  }
  .tab {
    width: 100% !important;
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .btn-auth {
    font-size: 15px !important;
  }
  .form-login {
    margin-top: 20%;
  }
  .tab {
    width: 100% !important;
  }
}
</style>
