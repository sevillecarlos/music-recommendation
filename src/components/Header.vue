<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="header">
      <b-navbar-brand class="logo-img-text" href="#"
        ><img class="logo-img" src="../assets/logo.png" alt="Logo" /> Music
        Recommendation Spotify</b-navbar-brand
      >
      <b-navbar-toggle
        class="toggle"
        v-show="show"
        target="nav-collapse"
      ></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            class="drop-down-signout"
            menu-class="menu-drop-down-signout"
            v-show="show"
          >
            <template #button-content> Hi, {{ name.split(" ")[0] }} </template>
            <b-dropdown-header id="dropdown-header">{{
              email
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
.logo-img-text {
  font-size: 30px;
  font-family: "Quicksand", sans-serif;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
}
.logo-img:hover {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
}
.header {
  background-image: url("../assets/background.jpg");
  background-size: cover;
  background-position: center;
  background-color: #cccccc;
  box-shadow: 0 0 7px #fff, 0 0 30px rgb(157, 255, 0);
}
.header:hover{
  box-shadow: 0 0 7px #fff, 0 0 50px rgb(157, 255, 0);

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
  font-family: "Quicksand", sans-serif;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 1px rgb(157, 255, 0);
}
.menu-drop-down-signout {
  background-color: rgb(18, 20, 15) !important;
  border-radius: 20px !important;
  border: 3px solid rgba(0, 128, 0, 0.418) !important;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0) !important;
}
#dropdown-header {
  font-size: 100%;
  color: #53e21b;
  text-shadow: 0 0 0px rgb(5, 34, 12), 0 0 0px rgb(228, 255, 184);
  letter-spacing: 1px;
}

#dropdown-btn {
  font-size: 100%;
  background-color: rgb(18, 20, 15) !important;
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  color: rgba(0, 255, 21) !important;
  border: 3px solid !important;
  border-radius: 15px;
  border-top-right-radius: 10px !important;
  border-top-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
  border-right: none !important;
  border-left: none !important;
  letter-spacing: 1px;
}
#dropdown-btn:hover {
  box-shadow: 0 0 7px #fff, 0 0 30px rgb(157, 255, 0);
}

@media only screen and (max-width: 1200px) {
}
/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
  .logo-img-text {
    font-size: 100% !important;
  }
  .signout-btn {
    background-color: rgb(19, 19, 19);
    color: aliceblue;
  }
  .signout-btn a {
    color: rgb(50, 205, 50);
  }
  .drop-down-signout {
    font-size: 25px;
  }
  .menu-drop-down-signout {
    width: 30% !important;
    margin-left: 10% !important;
  }
  #dropdown-header {
    font-size: 80%;
  }

  #dropdown-btn {
    font-size: 80%;
  }
  .drop-down-signout {
    margin-left: 20px !important;
  }
}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .logo-img-text {
    font-size: 15px !important;
  }
  .signout-btn {
    background-color: rgb(19, 19, 19);
    color: aliceblue;
  }
  .signout-btn a {
    color: rgb(50, 205, 50);
  }
  .drop-down-signout {
    font-size: 15px;
  }
  .menu-drop-down-signout {
    width: 50% !important;
    margin-left: 10% !important;
  }
  #dropdown-header {
    font-size: 70%;
  }

  #dropdown-btn {
    font-size: 70%;
  }
  .drop-down-signout {
    margin-left: 20px !important;
  }
}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .logo-img-text {
    font-size: 15px !important;
  }
  .signout-btn {
    background-color: rgb(19, 19, 19);
    color: aliceblue;
  }
  .signout-btn a {
    color: rgb(50, 205, 50);
  }
  .drop-down-signout {
    font-size: 15px;
  }
  .menu-drop-down-signout {
    width: 50% !important;
    margin-left: 10% !important;
  }
  #dropdown-header {
    font-size: 60%;
  }

  #dropdown-btn {
    font-size: 70%;
  }
}
</style>
