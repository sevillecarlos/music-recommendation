<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="header">
      <b-navbar-brand class="logo-img" href="#"
        ><img class="logo-img" src="../assets/logo.png" alt="Logo" /> Music
        Recommendation Spotify</b-navbar-brand
      >
      <b-navbar-toggle v-show="show" target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown class="drop" v-show="show" right>
            <template #button-content>
              <em>Hi, {{ name.split(" ")[0] }}</em>
            </template>
            <b-dropdown-header id="dropdown-header-1">{{
              email
            }}</b-dropdown-header>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      name: "",
      email: "",
    };
  },
  watch: {
    showLogOut() {
      this.show = this.showLogOut;
    },
    userName() {
      this.name = this.userName;
    },
    userEmail() {
      this.email = this.userEmail;
    },
  },
  updated() {
    if (this.userName) {
      this.name = this.userName;
    }
    if (this.userEmail) {
      this.email = this.userEmail;
    }
    if (this.showLogOut) {
      this.show = this.showLogOut;
    }
  },
  computed: {
    showLogOut() {
      return this.$store.state.showLogOut;
    },
    userName() {
      return this.$store.state.userName;
    },
    userEmail() {
      return this.$store.state.userEmail;
    },
  },
  methods: {
    signOut() {
      setTimeout(() => {
        this.$router.push("/");
      }, 3000);
      this.$store.dispatch("signOut");
      this.$store.commit("setLogOutShow", false);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap");
.logo-img {
  font-size: 30px;
  font-family: "Quicksand", sans-serif;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
}
.header {
  background: rgb(37, 37, 44);
  background: -moz-linear-gradient(
    0deg,
    rgba(37, 37, 44, 1) 0%,
    rgba(20, 20, 26, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(37, 37, 44, 1) 0%,
    rgba(20, 20, 26, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(37, 37, 44, 1) 0%,
    rgba(20, 20, 26, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#25252c",endColorstr="#14141a",GradientType=1);
}
.signout-btn {
  background-color: rgb(19, 19, 19);
  color: aliceblue;
}
.signout-btn a {
  color: rgb(50, 205, 50);
}
</style>
