<template>
  <b-modal
    no-close-on-backdrop
    no-close-on-esc
    centered
    hide-header
    hide-footer
    id="modal-1"
    modal-class="modal"
    content-class="content-modal-auth-spotify"
    v-model="modalShow"
  >
    <Overlay :showOverlay="showOverlay">
      <b-card class="card-auth">
        <template #header>
          <h5 class="title-modal-header">
            Log to Spotify
            <img
              class="logo-model"
              src="../assets/cover-image.png"
              alt="logo"
            />
          </h5>
        </template>
        <b-button class="login-spotify-btn" pill :href="urlRedirect">
        </b-button>
        <div class="w-100">
          <b-button
            @click="returnToLogin"
            pill
            size="md"
            class="float-right return-btn"
            variant="outline-secondary"
          >
            Sign Out
          </b-button>
        </div>
      </b-card>
    </Overlay>
  </b-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Overlay from "../ui/Overlay.vue";

export default {
  name: "AuthToSpotify",
  components: {
    Overlay,
  },
  data() {
    return {
      showOverlay: false,
      urlRedirect: `http://localhost:8888/login-spotify`,
      modalShow: true,
    };
  },
  computed: {
    ...mapState({
      accessToken: "accessToken",
    }),
  },
  watch: {
    accessToken() {
      if (!this.accessToken) this.modalShow = true;
    },
  },
  methods: {
    ...mapActions({
      signOut: "signOut",
    }),

    async returnToLogin() {
      this.showOverlay = true;
      await this.signOut();
      setTimeout(() => {
        this.$router.push("/");
      }, 3000);
    },

    getAccessToken() {
      const accessToken = localStorage.getItem("_@ccess");
      if (accessToken) {
        this.modalShow = false;
        this.$store.commit("setAccessToken", accessToken);
      }
    },
  },
  created() {
    this.getAccessToken();
  },
};
</script>

<style>
.login-spotify-btn {
  margin: auto;
  width: 50%;
  margin-left: 25%;
  border: none !important;
  border-color: transparent !important;
  background-color: rgb(18, 20, 15) !important;
  content: url("../assets/spotify-logo.png");
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  transition: 0.3s background-color;
}
.login-spotify-btn:focus {
  outline-width: 0;
}
.modal {
  background-color: rgba(0, 0, 0, 0.445);
}
.card-auth {
  background-color: transparent !important;
  border: 1px solid green !important;
  border-radius: 50px !important;
  box-shadow: 0 0 7px #fff, 0 0 5px rgb(157, 255, 0);
}
.logo-model {
  width: 50px;
}

.modal-body {
  padding: 9px 15px;
  background-color: transparent !important;
  border: none;
  border-radius: 50px !important;
}

.modal-footer {
  padding: 9px 15px;
  background-color: #292b2c;
}
.title-modal-header {
  font-size: 150%;
  color: #fff;
  text-shadow: 0 0 7px rgb(5, 34, 12), 0 0 10px rgb(228, 255, 184);
  text-align: center;
}

.return-btn {
  box-shadow: 0 0 7px #fff, 0 0 10px rgb(157, 255, 0);
  color: rgba(0, 255, 21) !important;
  font-size: 20px !important;
  letter-spacing: 2px;
  background-color: rgb(18, 20, 15) !important;
  transition: color background-color 0.3s !important;
}
.content-modal-auth-spotify {
  background: transparent !important;
  border: none !important;
  border-radius: 50px !important;
}

@media (hover: hover) and (pointer: fine) {
  .login-spotify-btn:hover {
    background-color: transparent !important;
  }
  .return-btn:hover {
    background-color: transparent !important;
  }
}
</style>
