<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="header">
      <b-navbar-brand class="logo-img-text" href="/"
        ><img class="logo-img" src="../assets/cover-image.png" alt="Logo" />
        Music Recommendation</b-navbar-brand
      >

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-toggle class="toggle" target="nav-collapse"></b-navbar-toggle>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            class="drop-down-signout"
            menu-class="menu-drop-down-signout"
            v-show="token"
          >
            <template #button-content>
              Hi, {{ userName.split(" ")[0] }}
            </template>
            <b-dropdown-header id="dropdown-header">{{
              userEmail
            }}</b-dropdown-header>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item id="dropdown-btn" @click="signOut"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {};
  },
  watch: {
    token() {
      this.getToken();
    },
  },
  computed: {
    ...mapState({
      userName: "userName",
      userEmail: "userEmail",
      token: "token",
    }),
  },
  methods: {
    ...mapActions({
      getToken: "getToken",
    }),
    signOut() {
      setTimeout(() => {
        this.$store.dispatch("signOut");
        this.$router.push("/");
      }, 3000);
      this.$store.commit("setOverLayHome", true);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap");
.logo-img {
  width: 80px;
}
.logo-img-text {
  margin-left: 30px;
  font-size: 30px !important;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
}
.logo-img:hover {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
}
.header {
  box-shadow: 0 0 7px #fff, 0 0 25px rgb(157, 255, 0);
  border-radius: 50px !important;
}
.header:hover {
  box-shadow: 0 0 7px #fff, 0 0 30px rgb(157, 255, 0);
}
.signout-btn {
  background-color: rgb(19, 19, 19);
  color: aliceblue;
}
.signout-btn a {
  color: rgb(50, 205, 50);
}
.drop-down-signout {
  font-size: 30px;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
}
.menu-drop-down-signout {
  background-color: rgb(18, 20, 15) !important;
  border-radius: 20px !important;
  border: 1px solid rgba(0, 128, 0, 0.418) !important;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0) !important;
}
#dropdown-header {
  font-size: 100%;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
  letter-spacing: 1px;
}

#dropdown-btn {
  font-size: 100%;
  background-color: rgb(18, 20, 15) !important;
  color: rgba(0, 255, 21) !important;
  letter-spacing: 1px;
  border-radius: 20px;
}

@media only screen and (max-width: 1200px) {
    .logo-img {
    width: 90px;
  }
  .logo-img-text {
    font-size: 35px !important;
  }
}
/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
  .logo-img {
    width: 90px;
  }
  .logo-img-text {
    font-size: 35px !important;
  }
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .logo-img {
    width: 60px;
  }
  .logo-img-text {
    font-size: 20px !important;
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .logo-img {
    width: 50px;
  }
  .logo-img-text {
    font-size: 14px !important;
  }
}
</style>
