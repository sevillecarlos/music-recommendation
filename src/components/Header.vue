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
          <b-nav-item-dropdown v-show="show" right>
            <template #button-content>
              <em>Hi, {{ name.split(' ')[0] }}</em>
            </template>
            <b-dropdown-item>{{ email }}</b-dropdown-item>
            <b-dropdown-item class="signout-btn" @click="signOut">Sign Out</b-dropdown-item>
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
}
.header {
  background-color: #14141a;
}
.signout-btn{
  background-color: rgb(19, 19, 19);
  color: aliceblue;
}
.signout-btn a{
  color: rgb(50, 205, 50);
}
</style>
